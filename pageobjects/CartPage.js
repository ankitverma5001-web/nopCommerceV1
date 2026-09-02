// Author - AnkitQA
const {expect} = require('@playwright/test');


class CartPage {

    constructor(page) {
        this.page = page;
        this.cart = page.locator('.shopping_cart_link');
        this.product = page.locator('.inventory_item_name');

    }

    async navigateToCart() {
        await this.cart.click();
    }

   async verifyItemInCart(productName) {
        await expect(this.product).toHaveText(productName)
    }
}
module.exports = CartPage