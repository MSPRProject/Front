import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: [
    '**/src/app/**/*.spec.ts',
  ],
  webServer: {
    command: 'npx ng serve',
    port: 4200,
    timeout: 120000,
  },
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
