const test = require('@playwright/test');
const POManager = require('../pageobjects/POManager');

test(' nopCommerce validations', async ({ page }) => {

    const username = 'standard_user'
    const password = 'secret_sauce'
    const productName = "Sauce Labs Bike Light"
    const firstName = "james"
    const lastName = "bond"
    const postalCode = "007"

    const poManager = new POManager(page);
    await poManager.getLoginPage().navigateToLoginPage(username, password);

    await poManager.getPortalPage().selectProductandAdd(productName);

    await poManager.getCartPage().navigateToCart();
    await poManager.getCartPage().verifyItemInCart(productName);

    await poManager.getCheckoutPage().navigateToCheckoutPage();
    await poManager.getCheckoutPage().enterFormDetails(firstName, lastName, postalCode);
    await poManager.getCheckoutPage().verifyItemInCheckout(productName);

    await poManager.getOrderReviewPage().placeOrder();
    await poManager.getOrderReviewPage().verifyorderCompletion();

    //await page.pause();

})