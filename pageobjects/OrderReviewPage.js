// Author - AnkitQA
const { expect } = require('@playwright/test');


class OrderReviewPage {

    constructor(page) {

        this.page = page;
        this.finishButton = page.locator('#finish');
        this.thankYouMsg = page.locator('.checkout_complete_container h2');
        this.homePage = page.locator("#back-to-products");

    }

    async placeOrder() {

        await this.finishButton.click();
    }

    async verifyorderCompletion() {
        expect(this.thankYouMsg).toHaveText("Thank you for your order!")
        console.log(this.thankYouMsg.textContent())
        await this.homePage.click();

    }
}

module.exports = OrderReviewPage;