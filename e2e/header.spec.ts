
import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('doit afficher le logo', async ({ page }) => {
    const logo = page.locator('header img[alt="logo"]');
    await expect(logo).toBeVisible();
  });

  test('doit contenir le titre de l\'application', async ({ page }) => {
    await expect(page.locator('header')).toContainText(/DocNavigator/i);
  });

  test('le lien GitHub pointe vers le bon URL', async ({ page }) => {
    const githubLink = page.locator('header a[href*="github.com"]');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
  });

  test('le header est sticky', async ({ page }) => {
    const header = page.locator('header');
    const position = await header.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('sticky');
  });
});
