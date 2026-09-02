require('dotenv').config();
const { test, request, expect } = require("@playwright/test")
const loginPayload = { userEmail: process.env.RSA_USER_EMAIL, userPassword: process.env.RSA_USER_PASSWORD }
const orderPayload = { orders: [{ country: "Azerbaijan", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayload = { data: [], "message": "No Orders" }
const { APiUtils } = require('./utils/APiUtils.js');

let response;
let apiUtils;

// Create API context and order once for the suite
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// UI test that uses the created order and token
test('test case for intercepting api json response ', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayload);
        route.fulfill({
            response,
            body,

        })

    });

    await page.locator("[routerlink*=myorders]").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    //await page.pause();
    const orderText = await page.locator(".mt-4").textContent();
    console.log(orderText);
})
