import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const LANGS = ['en', 'fr', 'it', 'de'];

test.describe('Switch Language', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForLoadState('domcontentloaded');
  });

  for (let i = 0; i < LANGS.length; i++) {
    const lang = LANGS[i];
    test(`should display correct "Refresh" text in ${lang}`, async ({ page }) => {
      const jsonPath = path.join(process.cwd(), 'public', 'i18n', `${lang}.json`);
      const fileContent = fs.readFileSync(jsonPath, 'utf-8');
      const translations = JSON.parse(fileContent);
      const refreshText = translations?.app?.dashboard?.refresh;
      expect(refreshText).toBeDefined();

      const langButton = page.locator('[name="toggleLocale"]');
      await expect(langButton).toBeVisible({ timeout: 5000 });

      for (let j = 0; j < i; j++) {
        await langButton.click();
      }

      const refreshBtn = page.locator('[data-testid="refresh-button"]');
      const btnText = await refreshBtn.textContent();
      console.log("val btn: " + btnText);
      console.log("i18n: " + refreshText);

      await expect(refreshBtn).toBeVisible({ timeout: 5000 });
      await expect(refreshBtn).toHaveText(refreshText);
    });
  }
});

