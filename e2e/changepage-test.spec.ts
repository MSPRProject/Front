import { test, expect } from '@playwright/test';

test.describe('Sidebar navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
  });

  test('should navigate to Predict page when clicking Predict link in sidebar', async ({ page }) => {
    // Cliquer sur le lien Predict dans la sidebar
    await page.click('nav.sidebar a[href="/predict"]');

    // Vérifier que l’URL a changé vers /predict
    await expect(page).toHaveURL(/\/predict$/);
  });

  test('should navigate to Dashboard page when clicking Dashboard link in sidebar', async ({ page }) => {
    // Cliquer sur le lien Dashboard dans la sidebar
    await page.click('nav.sidebar a[href="/"]');

    // Vérifier que l’URL est bien la racine
    await expect(page).toHaveURL(/\/$/);

    // Vérifier que la page Dashboard affiche un contenu spécifique
    await expect(page.locator('button', { hasText: /refresh/i })).toBeVisible();
  });
});
