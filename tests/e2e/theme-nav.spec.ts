import { expect, test } from '@playwright/test';
import { url } from './helpers';

const THEME_KEY = 'bloomora-theme';

test.describe('theme', () => {
  test('follows prefers-color-scheme with no flash of the wrong theme', async ({ browser }) => {
    for (const scheme of ['dark', 'light'] as const) {
      const context = await browser.newContext({ colorScheme: scheme });
      const page = await context.newPage();
      // Record what the inline head script decided before the DOM finished loading.
      await page.addInitScript(() => {
        document.addEventListener('DOMContentLoaded', () => {
          (window as unknown as { __themeAtDCL: string | null }).__themeAtDCL = document.documentElement.getAttribute('data-theme');
        });
      });
      await page.goto(url('/en/'));
      expect(await page.evaluate(() => (window as unknown as { __themeAtDCL: string | null }).__themeAtDCL)).toBe(scheme);
      expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe(scheme);
      await context.close();
    }
  });

  test('toggle switches theme, persists across reloads and pages', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(url('/en/'));
    const html = page.locator('html');
    const toggle = page.locator('[data-theme-toggle]').first();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate((k) => localStorage.getItem(k), THEME_KEY)).toBe('dark');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.goto(url('/vi/flowers/'));
    await expect(html).toHaveAttribute('data-theme', 'dark');
    // The stored choice beats the OS preference.
    await page.emulateMedia({ colorScheme: 'light' });
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('actually restyles the page', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(url('/en/'));
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const light = await bg();
    await page.locator('[data-theme-toggle]').first().click();
    await expect.poll(bg).not.toBe(light);
  });

  test('survives blocked storage', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('blocked', 'SecurityError');
        },
      });
    });
    await page.goto(url('/en/'));
    await page.locator('[data-theme-toggle]').first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
  });
});

test.describe('navigation', () => {
  test('desktop shows the nav links; mobile uses the menu', async ({ page, isMobile }) => {
    await page.goto(url('/en/'));
    if (!isMobile) {
      const nav = page.locator('.site-nav');
      await expect(nav).toBeVisible();
      await expect(page.locator('[data-menu-trigger]')).toBeHidden();
      await nav.getByRole('link', { name: 'Flowers' }).click();
      await expect(page).toHaveURL(new RegExp(`${url('/en/flowers/')}$`));
      await expect(nav.getByRole('link', { name: 'Flowers' })).toHaveAttribute('aria-current', 'page');
    } else {
      await expect(page.locator('.site-nav')).toBeHidden();
      const trigger = page.locator('[data-menu-trigger]');
      const panel = page.locator('[data-menu-panel]');
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await panel.getByRole('link', { name: 'Learn' }).click();
      await expect(page).toHaveURL(new RegExp(`${url('/en/learn/')}$`));
    }
  });

  test('touch targets are at least 44px in the header', async ({ page }) => {
    await page.goto(url('/en/'));
    const boxes = await page.locator('.site-header button:visible, .site-header .nav-link:visible, .site-header [data-lang-switch]:visible').evaluateAll((els) =>
      els.map((e) => {
        const r = e.getBoundingClientRect();
        return { name: (e.getAttribute('aria-label') ?? e.textContent ?? '').trim(), w: r.width, h: r.height };
      }),
    );
    expect(boxes.length).toBeGreaterThan(2);
    for (const b of boxes) {
      expect(b.w, `${b.name} width`).toBeGreaterThanOrEqual(43.5);
      expect(b.h, `${b.name} height`).toBeGreaterThanOrEqual(43.5);
    }
  });

  test('language switch goes to the translated page', async ({ page }) => {
    await page.goto(url('/en/flowers/rose/'));
    await page.locator('[data-lang-switch="vi"]').first().click();
    await expect(page).toHaveURL(new RegExp(`${url('/vi/flowers/hoa-hong/')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  });

  test('skip link and anchor offset under the sticky header', async ({ page }) => {
    await page.goto(url('/en/'));
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link, a[href="#main"]').first();
    await expect(skip).toBeFocused();
    const pad = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop));
    const header = await page.evaluate(() => document.querySelector('.site-header')!.getBoundingClientRect().height);
    expect(pad).toBeGreaterThanOrEqual(header - 1);
  });

  test('unknown URLs get a non-indexed 404 page', async ({ page }) => {
    const res = await page.goto(url('/en/does-not-exist/'));
    expect(res?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });
});

test.describe('404 page language', () => {
  const TEXT = {
    vi: { title: 'Không tìm thấy trang này', other: 'This page could not be found', footer: 'Các loài hoa' },
    en: { title: 'This page could not be found', other: 'Không tìm thấy trang này', footer: 'Flowers' },
  } as const;

  /** Only the expected language is shown: content, header, footer, <html lang> and the tab title. */
  async function expectOnly(page: import('@playwright/test').Page, lang: 'vi' | 'en') {
    const t = TEXT[lang];
    await expect(page.getByRole('heading', { level: 1, name: t.title })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: t.other })).toHaveCount(0);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page).toHaveTitle(`${t.title} | Bloomora`);
    await expect(page.locator('footer.site-footer:visible')).toHaveCount(1);
    await expect(page.locator('footer.site-footer:visible')).toContainText(t.footer);
    await expect(page.locator('header.site-header:visible')).toHaveCount(1);
  }

  for (const lang of ['vi', 'en'] as const) {
    test(`shows only ${lang} under /${lang}/`, async ({ page }) => {
      const res = await page.goto(url(`/${lang}/does-not-exist/`));
      expect(res?.status()).toBe(404);
      await expectOnly(page, lang);
    });
  }

  test('the URL language beats a stored preference', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('bloomora-lang', 'vi'));
    await page.goto(url('/en/does-not-exist/'));
    await expectOnly(page, 'en');
  });

  test('outside /vi/ and /en/ it uses the stored language, then the browser language', async ({ browser }) => {
    const stored = await browser.newContext({ locale: 'vi-VN' });
    const storedPage = await stored.newPage();
    await storedPage.addInitScript(() => localStorage.setItem('bloomora-lang', 'en'));
    await storedPage.goto(url('/does-not-exist/'));
    await expectOnly(storedPage, 'en');
    await stored.close();

    for (const [locale, lang] of [['vi-VN', 'vi'], ['en-US', 'en']] as const) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto(url('/does-not-exist/'));
      await expectOnly(page, lang);
      await context.close();
    }
  });

  test('without JavaScript it falls back to both languages with a Vietnamese header and footer', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(url('/en/does-not-exist/'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(2);
    await expect(page.locator('footer.site-footer:visible')).toHaveCount(1);
    await expect(page.locator('header.site-header:visible')).toHaveCount(1);
    await context.close();
  });

  test('the visible header links to the visitor language', async ({ page }) => {
    await page.goto(url('/en/does-not-exist/'));
    const home = page.locator('header.site-header:visible a.brand');
    await expect(home).toHaveAttribute('href', url('/en/'));
  });
});

test.describe('language gateway', () => {
  test('sends Vietnamese browsers to /vi/', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'vi-VN' });
    const page = await context.newPage();
    await page.goto(url('/'));
    await expect(page).toHaveURL(new RegExp(`${url('/vi/')}$`));
    await context.close();
  });

  test('sends other browsers to /en/ and honours a remembered choice', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    await page.goto(url('/'));
    await expect(page).toHaveURL(new RegExp(`${url('/en/')}$`));
    await page.evaluate(() => localStorage.setItem('bloomora-lang', 'vi'));
    await page.goto(url('/'));
    await expect(page).toHaveURL(new RegExp(`${url('/vi/')}$`));
    await context.close();
  });

  test('stays put without JavaScript and offers both languages', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(url('/'));
    await expect(page.locator('a[href$="/vi/"]').first()).toBeVisible();
    await expect(page.locator('a[href$="/en/"]').first()).toBeVisible();
    await context.close();
  });
});

test.describe('responsive layout', () => {
  for (const path of ['/vi/', '/en/flowers/', '/vi/flowers/hoa-hong/', '/en/learn/', '/en/learn/flower-care-basics/', '/en/about/']) {
    test(`no horizontal scrolling on ${path}`, async ({ page }) => {
      await page.goto(url(path));
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test('works at 320px wide', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(url('/en/flowers/lotus/'));
    await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  // The pages added for sharing, planning and teaching must hold up on the smallest phones too.
  for (const path of [
    '/vi/quiz/',
    '/en/quiz/result/bud-development/?f=rose',
    '/vi/planner/?f=marigold&s=2026-10-22&g=tet',
    '/en/classroom/',
    '/vi/flowers/hoa-sen/moment/blooming/',
    '/en/classroom/cards/sunflower/',
    '/vi/embed/hoa-sen/',
  ]) {
    test(`no horizontal scrolling at 320px on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await page.goto(url(path));
      await page.waitForLoadState('networkidle');
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    });
  }

  test('the header still fits between the phone menu and the full navigation (1000 px, 900 px)', async ({ page }) => {
    for (const width of [1000, 900, 820]) {
      await page.setViewportSize({ width, height: 700 });
      await page.goto(url('/vi/'));
      const { scroll, client } = await page.evaluate(() => {
        const inner = document.querySelector('.site-header__inner')!;
        return { scroll: inner.scrollWidth, client: inner.clientWidth };
      });
      expect(scroll, `header overflows at ${width}px`).toBeLessThanOrEqual(client + 1);
    }
  });
});
