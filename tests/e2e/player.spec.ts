import { expect, test } from '@playwright/test';
import { trackErrors, url, waitForPlayer } from './helpers';

test.describe('time-lapse player', () => {
  test('server-renders a poster, then hydrates into the live illustration without errors', async ({ browser }) => {
    // Without JavaScript the poster image is what visitors (and crawlers) get.
    const noJs = await browser.newContext({ javaScriptEnabled: false });
    const plain = await noJs.newPage();
    await plain.goto(url('/en/flowers/sunflower/'));
    await expect(plain.locator('img.tl__poster')).toBeVisible();
    await expect(plain.locator('img.tl__poster')).toHaveAttribute('alt', /sunflower/i);
    await noJs.close();

    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = await trackErrors(page);
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await expect(player.locator('svg').first()).toBeVisible();
    await expect(player).toHaveAttribute('data-status', 'paused');
    expect(errors).toEqual([]);
    await context.close();
  });

  test('play, pause and restart', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await page.getByTestId('play-toggle').click();
    await expect(player).toHaveAttribute('data-status', 'playing');
    await expect(player).toHaveAttribute('data-stage', 'seed');
    await page.getByRole('button', { name: '8x', exact: true }).click();
    await expect.poll(async () => Number(await player.getAttribute('data-progress')), { timeout: 8000 }).toBeGreaterThan(15);

    await page.getByTestId('play-toggle').click();
    await expect(player).toHaveAttribute('data-status', 'paused');
    const frozen = await player.getAttribute('data-progress');
    await page.waitForTimeout(600);
    expect(await player.getAttribute('data-progress')).toBe(frozen);

    await page.getByTestId('restart').click();
    await expect(player).toHaveAttribute('data-status', 'playing');
    await expect.poll(async () => Number(await player.getAttribute('data-progress'))).toBeLessThan(25);
  });

  test('seeking with the timeline changes the stage and percentage', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    const timeline = page.getByTestId('timeline');
    await timeline.fill('0');
    await expect(player).toHaveAttribute('data-stage', 'seed');
    await timeline.fill('1000');
    await expect(player).toHaveAttribute('data-stage', 'wilting');
    await expect(page.getByTestId('percent')).toContainText('100');
    await timeline.fill('500');
    await expect(page.getByTestId('percent')).toContainText('50');
  });

  test('stage buttons, next and previous move between stages', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await page.getByTestId('timeline').fill('0');
    await page.getByTestId('next-stage').click();
    await expect(player).toHaveAttribute('data-stage-index', '1');
    await page.getByTestId('next-stage').click();
    await expect(player).toHaveAttribute('data-stage-index', '2');
    await page.getByTestId('prev-stage').click();
    await expect(player).toHaveAttribute('data-stage-index', '1');
    await page.locator('.tl__stage-btn').nth(6).click();
    await expect(player).toHaveAttribute('data-stage-index', '6');
    await expect(page.locator('.tl__stage-btn').nth(6)).toHaveAttribute('aria-current', 'step');
    await expect(page.getByTestId('stage-name')).not.toBeEmpty();
  });

  test('speed buttons change the speed', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    for (const s of ['0.5', '2', '4', '8', '1']) {
      await page.getByRole('button', { name: `${s}x`, exact: true }).click();
      await expect(player).toHaveAttribute('data-speed', s);
    }
  });

  test('keyboard: space toggles, arrows seek, brackets change stage', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await page.locator('.tl__stage').focus();
    await page.keyboard.press('Space');
    await expect(player).toHaveAttribute('data-status', 'playing');
    await page.keyboard.press('Space');
    await expect(player).toHaveAttribute('data-status', 'paused');
    await page.keyboard.press('Home');
    await expect(player).toHaveAttribute('data-progress', '0');
    await page.keyboard.press('Shift+ArrowRight');
    await expect(player).toHaveAttribute('data-progress', '10');
    await page.keyboard.press(']');
    const before = Number(await player.getAttribute('data-stage-index'));
    expect(before).toBeGreaterThan(0);
    await page.keyboard.press('[');
    await expect(player).not.toHaveAttribute('data-stage-index', String(before));
  });

  test('labels the animation as illustrative and shows estimate notes', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    await waitForPlayer(page);
    await expect(page.locator('.tl__notes')).toContainText(/illustrat/i);
    await expect(page.locator('.tl__desc-dur')).toContainText(/estimate/i);
  });

  test('fullscreen toggle works (real API or CSS fallback)', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    await waitForPlayer(page);
    const btn = page.locator('.tl__fs');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  test('the player still works when the poster image is missing', async ({ page }) => {
    await page.route('**/art/sunflower.svg', (route) => route.abort());
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await expect(player.locator('svg').first()).toBeVisible();
    await page.getByTestId('play-toggle').click();
    await expect(player).toHaveAttribute('data-status', 'playing');
  });
});

test.describe('prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('steps through stages instead of animating continuously', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/'));
    const player = await waitForPlayer(page);
    await expect(player).toHaveAttribute('data-reduced-motion', 'true');
    await expect(page.getByTestId('reduced-note')).toBeVisible();
    await page.getByTestId('restart').click();
    await expect(player).toHaveAttribute('data-stage-index', '0');
    await page.waitForTimeout(500);
    await expect(player).toHaveAttribute('data-stage-index', '0'); // no creeping progress between stages
    await expect(player).toHaveAttribute('data-stage-index', '1', { timeout: 4000 });
  });

  test('CSS transitions are neutralised', async ({ page }) => {
    await page.goto(url('/en/'));
    const dur = await page.evaluate(() => getComputedStyle(document.querySelector('.btn')!).transitionDuration);
    expect(parseFloat(dur)).toBeLessThanOrEqual(0.001);
  });
});

test.describe('Vietnamese player', () => {
  test('uses Vietnamese labels', async ({ page }) => {
    await page.goto(url('/vi/flowers/hoa-sen/'));
    const player = await waitForPlayer(page);
    await expect(page.getByTestId('play-toggle')).toHaveAttribute('aria-label', /Phát/);
    await page.getByTestId('timeline').fill('0');
    await expect(player).toHaveAttribute('data-stage', 'seed');
    await expect(page.getByTestId('elapsed')).toHaveText('0 ngày');
  });
});

test.describe('home page player', () => {
  test('hydrates when scrolled into view', async ({ page }) => {
    await page.goto(url('/vi/'));
    const player = page.locator('[data-player]').first();
    await player.scrollIntoViewIfNeeded();
    await expect(player).toHaveAttribute('data-hydrated', 'true');
  });
});
