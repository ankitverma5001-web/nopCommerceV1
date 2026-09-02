require('dotenv').config();
const { test } = require("@playwright/test")


// Create API context and order once for the suite
test('routing using networking request', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(process.env.RSA_USER_EMAIL);
    await page.locator("#userPassword").fill(process.env.RSA_USER_PASSWORD);
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a1da5f817ee3e78baafcde1' }));
    await page.locator("[routerlink*=myorders]").click();
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("View")').first().click();
    const errortext = await page.locator('.blink_me').textContent();
    await page.screenshot({ path: 'snaps.png' });
    console.log(errortext);

});