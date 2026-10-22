import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { trackErrors, url, waitForPlayer } from './helpers';

const pngSize = (buf: Buffer) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });
const isPng = (buf: Buffer) => buf.subarray(0, 8).toString('hex') === '89504e470d0a1a0a';

async function answerQuiz(page: Page, flower: string) {
  await page.goto(url('/en/quiz/'));
  await expect(page.locator('[data-quiz]')).toHaveAttribute('data-quiz-ready', 'true');
  for (let i = 0; i < 7; i++) {
    await page.locator('[data-quiz-step]:not([hidden]) .quiz-option').first().click();
    await page.locator('[data-quiz-next]').click();
  }
  await page.locator('.quiz-flower', { hasText: flower }).click();
  await page.locator('[data-quiz-next]').click();
}

test.describe('quiz', () => {
  test('answering every question opens the result for the chosen flower', async ({ page }) => {
    const errors = await trackErrors(page);
    await answerQuiz(page, 'Lotus');
    await expect(page).toHaveURL(/\/en\/quiz\/result\/[a-z-]+\/\?f=lotus$/);
    const stage = new URL(page.url()).pathname.split('/').filter(Boolean).pop()!;
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-result-art]')).toHaveAttribute('src', new RegExp(`/art/moments/lotus/${stage}\\.svg$`));
    await expect(page.locator('[data-result-caption]')).toContainText('Lotus');
    expect(errors).toEqual([]);
  });

  test('cannot go on without choosing, and back keeps the answer', async ({ page }) => {
    await page.goto(url('/en/quiz/'));
    await expect(page.locator('[data-quiz]')).toHaveAttribute('data-quiz-ready', 'true');
    await expect(page.locator('[data-quiz-next]')).toBeDisabled();
    await page.locator('.quiz-option').first().click();
    await expect(page.locator('[data-quiz-next]')).toBeEnabled();
    await page.locator('[data-quiz-next]').click();
    await expect(page.locator('[data-quiz-count]')).toHaveText('Question 2 of 8');
    await page.locator('[data-quiz-back]').click();
    await expect(page.locator('[data-quiz-count]')).toHaveText('Question 1 of 8');
    await expect(page.locator('[data-quiz-step]:not([hidden]) input:checked')).toHaveCount(1);
  });

  test('a friend’s result link shows their flower and links to its time-lapse', async ({ page }) => {
    await page.goto(url('/vi/quiz/result/bud-development/?f=rose'));
    await expect(page.locator('[data-result-art]')).toHaveAttribute('src', /\/art\/moments\/rose\/bud-development\.svg$/);
    await expect(page.locator('[data-result-caption]')).toContainText('Hoa hồng');
    await expect(page.locator('[data-watch-link]')).toHaveAttribute('href', new RegExp('/vi/flowers/hoa-hong/moment/bud-development/$'));
    await expect(page.getByRole('link', { name: /Làm trắc nghiệm/ })).toBeVisible();
  });

  test('a link with an unknown flower falls back to the stage’s own flower', async ({ page }) => {
    await page.goto(url('/en/quiz/result/wilting/?f=not-a-flower'));
    await expect(page.locator('[data-result-art]')).toHaveAttribute('src', /\/art\/moments\/chrysanthemum\/wilting\.svg$/);
  });

  test('saving the result card downloads a 1080×1920 PNG', async ({ page }) => {
    await page.goto(url('/en/quiz/result/blooming/?f=cherry-blossom'));
    const download = page.waitForEvent('download');
    await page.locator('[data-save-card]').click();
    const file = await download;
    expect(file.suggestedFilename()).toBe('bloomora-blooming-cherry-blossom.png');
    const buf = await readFile((await file.path())!);
    expect(isPng(buf)).toBe(true);
    expect(pngSize(buf)).toEqual({ w: 1080, h: 1920 });
    await expect(page.locator('[data-result-note]')).toHaveText('9:16 result card created');
  });

  test('result pages are noindex and carry their own share image', async ({ page, request }) => {
    await page.goto(url('/vi/quiz/result/seed/'));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toContain('/og/quiz/vi/seed.png');
    const res = await request.get(new URL(og!).pathname);
    expect(res.status()).toBe(200);
    expect(pngSize(await res.body())).toEqual({ w: 1200, h: 630 });
  });

  test('without JavaScript the questions are all readable and every result is linked', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url('/en/quiz/'));
    await expect(page.locator('[data-quiz-step]:visible')).toHaveCount(8);
    await expect(page.locator('.quiz-results-list a')).toHaveCount(9);
    await ctx.close();
  });
});

test.describe('bloom planner', () => {
  test('a shared link shows the window and whether it is in time for Tết', async ({ page }) => {
    const errors = await trackErrors(page);
    await page.goto(url('/vi/planner/?f=marigold&s=2026-10-22&g=tet'));
    await expect(page.locator('[data-planner]')).toHaveAttribute('data-planner-ready', 'true');
    const result = page.locator('[data-planner-result]');
    await expect(result).toContainText('11/12/2026 – 30/1/2027');
    await expect(result).toContainText('Mốc: Tết Nguyên Đán (6/2/2027)');
    await expect(result).toContainText('Kịp: dự kiến nở trước mốc');
    await expect(page.locator('[data-flower-id="cherry-blossom"] [data-fit]')).toHaveText('Khó kịp mốc này');
    expect(errors).toEqual([]);
  });

  test('changing the flower and goal updates the answer and the address', async ({ page }) => {
    await page.goto(url('/en/planner/'));
    await expect(page.locator('[data-planner]')).toHaveAttribute('data-planner-ready', 'true');
    await page.locator('#pl-flower').selectOption('rose');
    await page.locator('#pl-goal').selectOption('womens-day');
    await expect(page.locator('[data-planner-result]')).toContainText('Result for Rose');
    await expect(page.locator('[data-planner-result]')).toContainText('International Women’s Day');
    expect(new URL(page.url()).search).toContain('f=rose');
    expect(new URL(page.url()).search).toContain('g=womens-day');
    await page.locator('#pl-goal').selectOption('custom');
    await expect(page.locator('#pl-goal-date')).toBeVisible();
    await page.locator('#pl-goal-date').fill('2027-05-01');
    expect(new URL(page.url()).search).toContain('g=2027-05-01');
  });

  test('the copy button copies the link with the current choice', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium-specific');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(url('/en/planner/?f=lotus&g=tet'));
    await expect(page.locator('[data-planner]')).toHaveAttribute('data-planner-ready', 'true');
    await page.getByRole('button', { name: 'Copy link' }).click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('/en/planner/');
    expect(text).toContain('f=lotus');
    expect(text).toContain('g=tet');
  });

  test('without JavaScript the table still shows time to bloom for every species', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url('/en/planner/'));
    await expect(page.locator('[data-planner-table] tbody tr')).toHaveCount(8);
    await expect(page.locator('[data-planner-table] tbody tr').first()).toContainText('after the start date');
    await ctx.close();
  });
});

test.describe('moments and deep links', () => {
  test('a moment page opens its stage, is noindex and has its own share image', async ({ page, request }) => {
    await page.goto(url('/en/flowers/lotus/moment/bud-development/'));
    const player = await waitForPlayer(page);
    await expect(player).toHaveAttribute('data-stage', 'bud-development');
    await expect(player).toHaveAttribute('data-status', 'paused');
    await expect(page.locator('h1')).toHaveText('Lotus: Bud development');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toContain('/og/moments/en/lotus-bud-development.png');
    const res = await request.get(new URL(og!).pathname);
    expect(res.status()).toBe(200);
    expect(pngSize(await res.body())).toEqual({ w: 1200, h: 630 });
    await expect(page.locator('.moment-stages a[aria-current="page"]')).toContainText('Bud development');
  });

  test('without JavaScript the moment page already shows that stage', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url('/en/flowers/lotus/moment/seedling/'));
    await expect(page.locator('img.tl__poster')).toHaveAttribute('src', /\/art\/moments\/lotus\/seedling\.svg$/);
    await ctx.close();
  });

  test('?stage= opens the species page on that stage', async ({ page }) => {
    await page.goto(url('/en/flowers/sunflower/?stage=wilting#timelapse'));
    const player = await waitForPlayer(page);
    await expect(player).toHaveAttribute('data-stage', 'wilting');
    await page.goto(url('/en/flowers/sunflower/?stage=bogus'));
    await expect(await waitForPlayer(page)).toHaveAttribute('data-stage', 'full-bloom');
  });

  test('"share this moment" gives a link to the stage on screen', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium-specific');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }));
    await page.goto(url('/en/flowers/rose/?stage=blooming'));
    await waitForPlayer(page);
    await page.getByTestId('share-moment').click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toMatch(/\/en\/flowers\/rose\/moment\/blooming\/$/);
  });

  test('saving the moment as an image downloads a vertical 1080×1920 PNG', async ({ page }) => {
    await page.goto(url('/vi/flowers/hoa-huong-duong/?stage=bud-formation'));
    await waitForPlayer(page);
    const download = page.waitForEvent('download');
    await page.getByTestId('save-image').click();
    const file = await download;
    expect(file.suggestedFilename()).toBe('bloomora-sunflower-bud-formation.png');
    const buf = await readFile((await file.path())!);
    expect(isPng(buf)).toBe(true);
    expect(pngSize(buf)).toEqual({ w: 1080, h: 1920 });
    await expect(page.getByTestId('share-note')).toHaveText('Đã tạo ảnh dọc 9:16');
  });

  test('making a clip records a vertical video the visitor can preview and download', async ({ page, isMobile }) => {
    test.skip(isMobile, 'recording takes 14 s; the desktop run covers it');
    test.setTimeout(90_000);
    await page.goto(url('/en/flowers/tulip/'));
    await waitForPlayer(page);
    await page.getByTestId('save-clip').click();
    await expect(page.getByRole('progressbar')).toBeVisible();
    await expect(page.getByTestId('clip-result')).toBeVisible({ timeout: 60_000 });
    await expect(page.getByTestId('clip-result').locator('video')).toHaveAttribute('src', /^blob:/);
    const download = page.waitForEvent('download');
    await page.getByTestId('clip-download').click();
    const file = await download;
    expect(file.suggestedFilename()).toMatch(/^bloomora-tulip\.(mp4|webm)$/);
    const buf = await readFile((await file.path())!);
    expect(buf.length).toBeGreaterThan(50_000);
  });
});

test.describe('embed and classroom', () => {
  test('the embed page is bare, noindex, plays and credits the species page', async ({ page }) => {
    const errors = await trackErrors(page);
    await page.goto(url('/vi/embed/hoa-sen/?theme=dark'));
    const player = await waitForPlayer(page);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('.site-header')).toHaveCount(0);
    await expect(page.locator('.site-footer')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await page.getByTestId('play-toggle').click();
    await expect(player).toHaveAttribute('data-status', 'playing');
    const credit = page.locator('.embed__credit a');
    await expect(credit).toHaveAttribute('href', /\/vi\/flowers\/hoa-sen\/$/);
    await expect(credit).toHaveAttribute('target', '_blank');
    expect(errors).toEqual([]);
  });

  test('the embed page works inside an iframe on another page', async ({ page }) => {
    await page.goto(url('/en/about/'));
    await page.evaluate((src) => {
      const f = document.createElement('iframe');
      f.id = 'f';
      f.src = src;
      f.width = '760';
      f.height = '1150';
      f.allow = 'fullscreen';
      document.body.append(f);
    }, url('/en/embed/sunflower/'));
    const frame = page.frameLocator('#f');
    await expect(frame.locator('[data-player]')).toHaveAttribute('data-hydrated', 'true');
    await expect(frame.locator('h1')).toContainText('Sunflower');
  });

  test('the species page offers embed code that follows the theme choice', async ({ page }) => {
    await page.goto(url('/en/flowers/lotus/'));
    await page.locator('[data-embed-code] summary').click();
    const code = page.locator('[data-embed-text]');
    await expect(code).toHaveValue(/<iframe src="https:\/\/[^"]+\/en\/embed\/lotus\/"/);
    await expect(code).toHaveValue(/allowfullscreen/);
    await expect(code).toHaveValue(/Lotus/);
    await page.locator('[data-embed-theme]').selectOption('dark');
    await expect(code).toHaveValue(/\/en\/embed\/lotus\/\?theme=dark"/);
  });

  test('the classroom page links every species to its presentation, cards and page', async ({ page }) => {
    await page.goto(url('/en/classroom/'));
    await expect(page.locator('h1')).toHaveText('Bloomora for classrooms');
    await expect(page.getByRole('link', { name: 'Open presentation' })).toHaveCount(8);
    await expect(page.getByRole('link', { name: 'Open cards' })).toHaveCount(8);
    await page.getByRole('link', { name: 'Open cards' }).first().click();
    await expect(page.locator('.stage-card')).toHaveCount(9);
  });

  test('the printable cards can hide their names for a sorting game', async ({ page }) => {
    await page.goto(url('/en/classroom/cards/sunflower/'));
    await expect(page.locator('[data-print]')).toBeVisible();
    const body = page.locator('.stage-card__body').first();
    await expect(body).toBeVisible();
    await page.locator('[data-blind]').check();
    await expect(body).toBeHidden();
    await expect(page.locator('.stage-card img').first()).toBeVisible();
    await page.locator('[data-blind]').uncheck();
    await expect(body).toBeVisible();
  });

  test('printing hides the site chrome and lays the cards out for A4', async ({ page }) => {
    await page.goto(url('/en/classroom/cards/sunflower/'));
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('[data-cards-tools]')).toBeHidden();
    const columns = await page.locator('[data-stage-cards]').evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(3);
  });
});

test.describe('navigation to the new pages', () => {
  test('the header and footer reach the quiz, planner and classroom', async ({ page, isMobile }) => {
    await page.goto(url('/en/'));
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
    const nav = isMobile ? page.locator('[data-menu-panel]') : page.locator('.site-nav');
    await expect(nav.getByRole('link', { name: 'Quiz' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Bloom planner' })).toBeVisible();
    await expect(page.locator('.site-footer').getByRole('link', { name: 'For classrooms' })).toBeVisible();
  });

  test('the home page promotes the three tools', async ({ page }) => {
    await page.goto(url('/vi/'));
    const tools = page.locator('#tools-title');
    await expect(tools).toBeVisible();
    const section = page.locator('section[aria-labelledby="tools-title"]');
    await expect(section.locator('a')).toHaveCount(3);
  });
});
