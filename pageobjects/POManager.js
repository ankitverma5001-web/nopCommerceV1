// Author - AnkitQA
const LoginPage = require('../pageobjects/LoginPage');
const PortalPage = require('../pageobjects/PortalPage');
const CartPage = require('../pageobjects/CartPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const OrderReviewPage = require('../pageobjects/OrderReviewPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.portalPage = new PortalPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getPortalPage() {
        return this.portalPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderReviewPage() {
        return this.orderReviewPage;
    }
}

module.exports = POManager;
