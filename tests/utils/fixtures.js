require('dotenv').config();
const base = require('@playwright/test')
const { request } = require('@playwright/test')
const { APiUtils } = require('./APiUtils.js');
const loginPayload = { userEmail: process.env.RSA_USER_EMAIL, userPassword: process.env.RSA_USER_PASSWORD }
const orderPayload = { orders: [{ country: "Azerbaijan", productOrderedId: "6960eac0c941646b7a8b3e68" }] }




exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const context = await browser.newContext()
            const page = await context.newPage()
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await page.locator("#userEmail").fill(process.env.RSA_USER_EMAIL);
            await page.locator("#userPassword").fill(process.env.RSA_USER_PASSWORD);
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');
            await use(page);
        },

        createOrder: async ({ }, use) => {

            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);

        },

        testdataforOrder: {

            productName: 'ADIDAS ORIGINAL'
        }

    })