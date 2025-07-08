import { test, expect } from '@playwright/test';

test.describe('Sidebar navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
  });

  test('should navigate to Predict page when clicking Predict link in sidebar', async ({ page }) => {
    await page.click('nav.sidebar a[href="/predict"]');

    await expect(page).toHaveURL(/\/predict$/);
  });

  test('should navigate to Dashboard page when clicking Dashboard link in sidebar', async ({ page }) => {
    await page.click('nav.sidebar a[href="/"]');

    await expect(page).toHaveURL(/\/$/);

    await expect(page.locator('button', { hasText: /refresh/i })).toBeVisible();
  });
});
