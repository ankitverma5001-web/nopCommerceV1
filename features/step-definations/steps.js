
const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const POManager = require('../../pageobjects/POManager');



Given('user should login to nopcommerce website with username {string} and password {string}', { timeout: 20 * 1000 }, async function (username, password) {

  this.poManager = new POManager(this.page);
  await this.poManager.getLoginPage().navigateToLoginPage(username, password);

});

When('user should add product {string} to the cart', async function (productName) {

  await this.poManager.getPortalPage().selectProductandAdd(productName);

});

When('user navigate to cart page and completed product checkout with firstname {string} lastname {string} and postalcode {string} to verify productname {string}', async function (firstName, lastName, postalCode , productname) {

  await this.poManager.getCartPage().navigateToCart();
  await this.poManager.getCartPage().verifyItemInCart(productname);

  await this.poManager.getCheckoutPage().navigateToCheckoutPage();
  await this.poManager.getCheckoutPage().enterFormDetails(firstName,lastName ,postalCode);
  await this.poManager.getCheckoutPage().verifyItemInCheckout(productname);

});

Then('verify order successfully placed',{timeout: 20*1000}, async function () {

  await this.poManager.getOrderReviewPage().placeOrder();
  await this.poManager.getOrderReviewPage().verifyorderCompletion();
});