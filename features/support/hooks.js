const { BeforeStep, AfterStep,After, Before, Status } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const POManager = require('../../pageobjects/POManager');


Before(async function () {

    this.browser = await chromium.launch({ headless: false })
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);

});

After(async function () {

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();

})

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: snapfirststack.png });
    }

})