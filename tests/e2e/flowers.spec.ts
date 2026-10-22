import { expect, test } from '@playwright/test';
import { trackErrors, url } from './helpers';

const list = (page: import('@playwright/test').Page) => page.locator('[data-flower-list]');
const visibleCards = (page: import('@playwright/test').Page) => page.locator('[data-flower-card]:not([hidden])');

test.describe('flower list: search and filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('/vi/flowers/'));
    await expect(list(page)).toHaveAttribute('data-filters-ready', 'true');
  });

  test('shows the first page of results and loads more', async ({ page }) => {
    await expect(visibleCards(page)).toHaveCount(6);
    await expect(list(page)).toHaveAttribute('data-total', '8');
    await page.locator('[data-load-more]').click();
    await expect(visibleCards(page)).toHaveCount(8);
    await expect(page.locator('[data-load-more]')).toBeHidden();
  });

  test('searches by Vietnamese name with and without diacritics', async ({ page }) => {
    const input = page.locator('#flower-search');
    await input.fill('hướng dương');
    await expect(visibleCards(page)).toHaveCount(1);
    await expect(visibleCards(page).first()).toContainText(/hướng dương/i);
    await input.fill('huong duong');
    await expect(visibleCards(page)).toHaveCount(1);
  });

  test('searches by English and scientific name', async ({ page }) => {
    const input = page.locator('#flower-search');
    await input.fill('lotus');
    await expect(visibleCards(page)).toHaveCount(1);
    await input.fill('Prunus');
    await expect(visibleCards(page)).toHaveCount(1);
    await expect(visibleCards(page).first().locator('a').first()).toHaveAttribute('href', /hoa-anh-dao/);
  });

  test('filters by group, colour, season and growth time, and combines them', async ({ page }) => {
    await page.locator('#filter-group').selectOption('bulb');
    await expect(visibleCards(page)).toHaveCount(1);
    await expect(visibleCards(page).first()).toContainText(/tulip/i);

    await page.locator('[data-reset]').first().click();
    await expect(list(page)).toHaveAttribute('data-total', '8');

    await page.locator('#filter-color').selectOption('yellow');
    const yellow = Number(await list(page).getAttribute('data-total'));
    expect(yellow).toBeGreaterThan(0);
    expect(yellow).toBeLessThan(8);
    await page.locator('#filter-speed').selectOption('fast');
    const both = Number(await list(page).getAttribute('data-total'));
    expect(both).toBeGreaterThan(0);
    expect(both).toBeLessThanOrEqual(yellow);
    await page.locator('#filter-season').selectOption('spring');
    expect(Number(await list(page).getAttribute('data-total'))).toBeLessThanOrEqual(both);
  });

  test('shows an empty state with a way back, then recovers', async ({ page }) => {
    await page.locator('#flower-search').fill('zzzzqqqq');
    await expect(page.locator('[data-empty]')).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(0);
    await expect(page.locator('[data-results-count]')).not.toBeEmpty();
    await page.locator('[data-empty] [data-reset]').click();
    await expect(page.locator('[data-empty]')).toBeHidden();
    await expect(visibleCards(page)).toHaveCount(6);
  });

  test('keeps the query in the URL and restores it on reload', async ({ page }) => {
    await page.locator('#flower-search').fill('sen');
    await expect(page).toHaveURL(/[?&]q=sen/);
    await page.reload();
    await expect(list(page)).toHaveAttribute('data-filters-ready', 'true');
    await expect(page.locator('#flower-search')).toHaveValue('sen');
    await expect(visibleCards(page)).toHaveCount(1);
  });

  test('ignores a hand-edited filter value that does not exist', async ({ page }) => {
    await page.goto(url('/vi/flowers/?group=banana&color=blue'));
    await expect(list(page)).toHaveAttribute('data-filters-ready', 'true');
    await expect(page.locator('#filter-group')).toHaveValue('');
  });

  test('opens the detail page of a card', async ({ page }) => {
    await visibleCards(page).first().locator('a').first().click();
    await expect(page).toHaveURL(/\/vi\/flowers\/[a-z-]+\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test('without JavaScript every flower is listed and linked', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(url('/en/flowers/'));
  await expect(page.locator('[data-flower-card]')).toHaveCount(8);
  for (const card of await page.locator('[data-flower-card] a').all()) {
    expect(await card.getAttribute('href')).toMatch(/\/en\/flowers\/[a-z-]+\/$/);
  }
  await context.close();
});

test('the list page loads without console errors', async ({ page }) => {
  const errors = await trackErrors(page);
  await page.goto(url('/en/flowers/'));
  await expect(list(page)).toHaveAttribute('data-filters-ready', 'true');
  expect(errors).toEqual([]);
});
