import { defineConfig, devices } from '@playwright/test';
import { normalizeBase } from './src/lib/url';

const PORT = Number(process.env.PW_PORT ?? 4321);
// Same variable the build reads, so `BASE_PATH=/bloomora/ npm run build:only && BASE_PATH=/bloomora/ npm run test:e2e`
// exercises a GitHub Pages project site end to end.
const BASE = normalizeBase(process.env.BASE_PATH);
// Where the browser binary lives when `playwright install` was not run (e.g. a pre-provisioned CI image).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
const launchOptions = executablePath ? { executablePath } : {};

const projects = [
  { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], launchOptions } },
  { name: 'chromium-mobile', use: { ...devices['Pixel 7'], launchOptions } },
];
// WebKit approximates Safari. It is opt-in because the browser is not installed everywhere
// (run `npx playwright install webkit`, then `PW_WEBKIT=1 npm run test:e2e`).
if (process.env.PW_WEBKIT === '1') {
  projects.push({ name: 'webkit-desktop', use: { ...devices['Desktop Safari'], launchOptions: {} } });
}

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
  projects,
  webServer: {
    // Serves the production build in dist/ (run `npm run build:only` first).
    command: `npx astro preview --port ${PORT} --host 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}${BASE}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
