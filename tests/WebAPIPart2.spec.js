require('dotenv').config();
const { test, request, expect } = require("@playwright/test")
const loginPayload = { userEmail: process.env.RSA_USER_EMAIL, userPassword: process.env.RSA_USER_PASSWORD }
const orderPayload = { orders: [{ country: "Azerbaijan", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const { APiUtils } = require('./utils/APiUtils.js');

let response;
let apiUtils;
let webContext;

// Create API context and order once for the suite
test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(process.env.RSA_USER_EMAIL);
    await page.locator("#userPassword").fill(process.env.RSA_USER_PASSWORD);
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });



});

// UI test that uses the created order and token
test('demo page', async ({ }) => {


    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[routerlink*=myorders]").click();
    // await page.locator("tbody").waitFor();
    // const rows = await page.locator("tbody tr");
    // for (let i = 0; i < await rows.count(); ++i) {
    //     const rowID = (await rows.nth(i).locator("th").textContent()).trim();
    //     if (response.orderID.includes(rowID)) {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }
    // const orderDetails = await page.locator(".col-text").textContent();
    // await page.pause();
});





