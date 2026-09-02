const { customtest } = require('../tests/utils/fixtures.js')
const { expect } = require("@playwright/test")



customtest('custom fixture implementation', async ({ authenticatedPage, createOrder, testdataforOrder }) => {


    await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await authenticatedPage.locator("[routerlink*=myorders]").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible();
    console.log(testdataforOrder.productName);
    
})