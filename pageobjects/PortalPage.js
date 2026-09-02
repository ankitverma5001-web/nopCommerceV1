// Author - AnkitQA
class PortalPage {

    constructor(page) {
        this.page = page;
        this.inventoryItem = page.locator('.inventory_item');
    }

    async selectProductandAdd(productName) {

        const productCount = await this.inventoryItem.count();
        for (let i = 0; i < productCount; i++) {
            const productText = await this.inventoryItem.nth(i).locator('.inventory_item_name').textContent();

            if (productText.includes(productName)) {

                await this.inventoryItem.nth(i).locator('button').click();
                break;
            }
        }
    }
}
module.exports = PortalPage