import { defineConfig, devices } from '@playwright/test';

// PR/CI tests exercise the freshly built app, never the unrelated live deployment.
// For a post-release check: PLAYWRIGHT_BASE_URL=https://www.amoai.ca npm run test:e2e
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL?.trim();
const localPort = process.env.PLAYWRIGHT_PREVIEW_PORT || '4173';
const localBaseURL = `http://127.0.0.1:${localPort}`;

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  globalTimeout: 8 * 60 * 1000,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: externalBaseURL || localBaseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: `npx vite preview --host 127.0.0.1 --port ${localPort} --strictPort`,
        url: localBaseURL,
        // Do not accidentally test a different checkout already bound to this port.
        reuseExistingServer: false,
        timeout: 120_000,
      },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
