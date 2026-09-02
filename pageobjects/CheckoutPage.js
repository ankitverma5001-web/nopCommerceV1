// Author - AnkitQA
const { expect } = require('@playwright/test');

class CheckoutPage {


    constructor(page) {

        this.page = page;
        this.checkoutButton = page.locator('.checkout_button');
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.continue = page.locator("#continue");
        this.product = page.locator('.inventory_item_name');

    }

    async navigateToCheckoutPage() {

        await this.checkoutButton.click();

    }

    async enterFormDetails(firstName, lastName, postalCode) {

        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.postalCode.fill(postalCode)
        await this.continue.click();
    }

    async verifyItemInCheckout(productName) {
        await expect(this.product).toHaveText(productName)
    }


}
module.exports = CheckoutPage;
