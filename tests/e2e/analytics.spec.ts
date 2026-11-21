import { expect, test } from '@playwright/test';
import { ANALYTICS_CODE, url } from './helpers';

const COUNT_JS = '**/gc.zgo.at/count.js';

test.describe('GoatCounter', () => {
  test('loads the script at most once per page and never sends personal data', async ({ page }) => {
    let scriptLoads = 0;
    const external: string[] = [];
    await page.route(COUNT_JS, (route) => {
      scriptLoads += 1;
      return route.fulfill({ contentType: 'text/javascript', body: 'window.__gcLoads=(window.__gcLoads||0)+1;' });
    });
    page.on('request', (r) => {
      if (!r.url().startsWith('http://127.0.0.1')) external.push(r.url());
    });
    await page.goto(url('/en/flowers/sunflower/'));
    await page.waitForLoadState('networkidle');

    const tags = await page.locator('script[data-goatcounter]').count();
    if (!ANALYTICS_CODE) {
      // Not configured: the site must not contact any analytics host.
      expect(tags).toBe(0);
      expect(scriptLoads).toBe(0);
      expect(external.filter((u) => /goatcounter|zgo\.at/.test(u))).toEqual([]);
      return;
    }
    expect(tags).toBe(1);
    expect(scriptLoads).toBe(1);
    expect(await page.evaluate(() => (window as unknown as { __gcLoads?: number }).__gcLoads)).toBe(1);
    const tag = page.locator('script[data-goatcounter]');
    await expect(tag).toHaveAttribute('data-goatcounter', `https://${ANALYTICS_CODE}.goatcounter.com/count`);
    await expect(tag).toHaveAttribute('src', 'https://gc.zgo.at/count.js');
    await expect(tag).toHaveAttribute('async', '');
    // Local development must not pollute stats.
    await expect(tag).toHaveAttribute('data-goatcounter-settings', /"allow_local":false/);
  });

  test('no custom tracking code or third-party trackers are present', async ({ page }) => {
    const hosts = new Set<string>();
    await page.route(COUNT_JS, (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
    page.on('request', (r) => hosts.add(new URL(r.url()).host));
    await page.goto(url('/en/'));
    await page.waitForLoadState('networkidle');
    const html = await page.content();
    // Events come only from GoatCounter's own data-goatcounter-click binding, never from our JavaScript.
    expect(html).not.toMatch(/goatcounter\.count\(|gtag\(|fbq\(|_paq|plausible|segment\.com|hotjar/i);
    const allowed = ['127.0.0.1:4321', 'gc.zgo.at', `${ANALYTICS_CODE}.goatcounter.com`];
    for (const host of hosts) expect(allowed, `unexpected host ${host}`).toContain(host);
  });

  test('the only event is a click on a flower card, one name per species', async ({ page }) => {
    await page.route(COUNT_JS, (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
    const names = new Set<string>();
    for (const path of ['/en/', '/vi/', '/en/flowers/', '/vi/flowers/', '/en/flowers/sunflower/', '/en/planner/', '/en/about/']) {
      await page.goto(url(path));
      const tracked = page.locator('[data-goatcounter-click]');
      for (const el of await tracked.all()) {
        // Every tracked element is the link of a flower card, and nothing else.
        await expect(el).toHaveClass(/flower-card__link/);
        const name = await el.getAttribute('data-goatcounter-click');
        expect(name, path).toMatch(/^click\/flower\/[a-z0-9-]+$/);
        expect((await el.getAttribute('data-goatcounter-title'))?.length, path).toBeGreaterThan(0);
        names.add(name!);
      }
      // Every flower card on the page carries the event, so no species is silently left out.
      // Tool and article cards share the CSS class but link elsewhere, and must stay untracked.
      expect(await tracked.count(), path).toBe(await page.locator('.flower-card__link[href*="/flowers/"]').count());
    }
    // The vi and en cards of one species share one event name.
    await page.goto(url('/vi/flowers/'));
    const vi = await page.locator('[data-goatcounter-click]').evaluateAll((els) => els.map((e) => e.getAttribute('data-goatcounter-click')));
    await page.goto(url('/en/flowers/'));
    const en = await page.locator('[data-goatcounter-click]').evaluateAll((els) => els.map((e) => e.getAttribute('data-goatcounter-click')));
    expect([...vi].sort()).toEqual([...en].sort());
    expect(names.size).toBeGreaterThan(1);
  });

  test('the script tag is the same on every page type', async ({ page }) => {
    await page.route(COUNT_JS, (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
    for (const path of ['/', '/vi/', '/en/flowers/', '/vi/flowers/hoa-sen/', '/en/learn/flower-life-cycle/', '/en/about/']) {
      await page.goto(url(path));
      expect(await page.locator('script[data-goatcounter]').count(), path).toBe(ANALYTICS_CODE ? 1 : 0);
    }
  });

  test('a visitor can opt out, and the choice is the one GoatCounter honours', async ({ page }) => {
    await page.goto(url('/en/about/'));
    const box = page.locator('[data-analytics-optout]');
    await expect(box).toBeVisible();
    if (!ANALYTICS_CODE) {
      await expect(page.locator('[data-optout-button]')).toHaveCount(0);
      return;
    }
    const button = page.locator('[data-optout-button]');
    await button.click();
    expect(await page.evaluate(() => localStorage.getItem('skipgc'))).toBe('t');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('[data-optout-button]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('[data-optout-button]').click();
    expect(await page.evaluate(() => localStorage.getItem('skipgc'))).toBeNull();
  });

  test('the site works when GoatCounter is blocked or down', async ({ page }) => {
    await page.route(COUNT_JS, (route) => route.abort());
    await page.route('**/*.goatcounter.com/**', (route) => route.abort());
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(url('/en/flowers/sunflower/'));
    await expect(page.locator('[data-player]')).toHaveAttribute('data-hydrated', 'true');
    await page.getByTestId('play-toggle').click();
    await expect(page.locator('[data-player]')).toHaveAttribute('data-status', 'playing');
    expect(errors).toEqual([]);
  });
});
