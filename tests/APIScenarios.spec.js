// Author - AnkitQA
const { test, expect, request } = require('@playwright/test');

const baseURL = 'https://www.saucedemo.com';
const validCredentials = {
  'user-name': 'standard_user',
  password: 'secret_sauce'
};
const invalidCredentials = {
  'user-name': 'standard_user',
  password: 'wrong_password'
};

test.describe('SauceDemo API scenarios', () => {
  test('GET home page loads successfully', async ({ request }) => {
    const response = await request.get(baseURL);

    expect(response.status()).toBe(200);
    const pageText = await response.text();
    expect(pageText).toContain('Swag Labs');
  });

  test('Valid login request creates authenticated session and inventory is accessible', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('[data-test="username"]').fill(validCredentials['user-name']);
    await page.locator('[data-test="password"]').fill(validCredentials.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*\/inventory\.html/);
    await expect(page.locator('[data-test="title"]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText('Products');
  });

  test('Invalid login request shows an error', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('[data-test="username"]').fill(invalidCredentials['user-name']);
    await page.locator('[data-test="password"]').fill(invalidCredentials.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
  });
});
