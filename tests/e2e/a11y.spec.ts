import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { url } from './helpers';

const PAGES = ['/vi/', '/en/flowers/', '/en/flowers/sunflower/', '/vi/flowers/hoa-sen/', '/en/learn/', '/en/learn/flower-care-basics/', '/vi/about/'];

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`axe WCAG 2.x A/AA — ${scheme}`, () => {
    test.use({ colorScheme: scheme });
    for (const path of PAGES) {
      test(path, async ({ page }) => {
        await page.goto(url(path));
        await page.waitForLoadState('networkidle');
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(summary).toEqual([]);
      });
    }
  });
}

test('every interactive control in the player has an accessible name', async ({ page }) => {
  await page.goto(url('/en/flowers/sunflower/'));
  await expect(page.locator('[data-player]')).toHaveAttribute('data-hydrated', 'true');
  const unnamed = await page.locator('[data-player] button, [data-player] input').evaluateAll((els) =>
    els.filter((e) => !(e.getAttribute('aria-label') || e.textContent?.trim() || e.getAttribute('title'))).map((e) => e.outerHTML.slice(0, 80)),
  );
  expect(unnamed).toEqual([]);
});

test('focus is visible on keyboard navigation', async ({ page }) => {
  await page.goto(url('/en/'));
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const s = getComputedStyle(el);
    return { width: parseFloat(s.outlineWidth), style: s.outlineStyle, shadow: s.boxShadow };
  });
  expect(outline.style !== 'none' && outline.width >= 2 ? true : outline.shadow !== 'none').toBe(true);
});
