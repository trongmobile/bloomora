import { expect, type Page } from '@playwright/test';
import { normalizeBase } from '../../src/lib/url';

/** Base path the site was built with (BASE_PATH), e.g. "/" or "/bloomora/". */
export const BASE = normalizeBase(process.env.BASE_PATH);
/** Prefixes a site-relative path ("/vi/flowers/") with the base path. */
export const url = (path: string): string => `${BASE}${path.replace(/^\//, '')}`;

/** Set when the site under test was built with a GoatCounter code. */
export const ANALYTICS_CODE = process.env.PUBLIC_GOATCOUNTER_CODE?.trim() || '';

/** Resolves once the React player has hydrated and the live illustration replaced the poster. */
export async function waitForPlayer(page: Page) {
  const player = page.locator('[data-player]').first();
  await expect(player).toHaveAttribute('data-hydrated', 'true');
  return player;
}

/**
 * Collects console errors and uncaught exceptions so a test can assert there were none.
 * The third-party GoatCounter script is stubbed so a sandbox without internet access does not
 * produce "failed to load resource" noise that has nothing to do with the site.
 */
export async function trackErrors(page: Page): Promise<string[]> {
  await page.route('**/gc.zgo.at/**', (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  return errors;
}
