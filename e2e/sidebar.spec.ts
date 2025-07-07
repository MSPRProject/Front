import { test, expect } from '@playwright/test';

test.describe('Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('doit être visible', async ({ page }) => {
    await expect(page.locator('aside')).toBeVisible();
  });

  test('doit contenir des liens de navigation', async ({ page }) => {
    const links = page.locator('aside nav a');
    await expect(await links.count()).toBeGreaterThan(0);
  });

  test('le lien actif doit être mis en surbrillance', async ({ page }) => {
    const firstLink = page.locator('aside nav a').first();
    await firstLink.click();
    await expect(firstLink).toHaveClass(/active|text-primary|selected/);
  });

  test('le contenu principal change après clic sur un lien', async ({ page }) => {
    await page.getByRole('link', { name: /Introduction/i }).click();
    await expect(page.locator('main')).toContainText(/Introduction/i);
  });

  test('la sidebar peut être fermée sur mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8
    const toggleBtn = page.getByRole('button', { name: /menu|toggle/i });
    await toggleBtn.click();
    await expect(page.locator('aside')).toBeHidden();
  });
});
