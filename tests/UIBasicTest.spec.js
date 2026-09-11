require('dotenv').config();
const { test } = require("@playwright/test")


test('login practice website demo', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const [newPage] = await Promise.all([

        context.waitForEvent('page')],
        page.locator(".blinkingText").first().click(),

    )

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const splitedText = text.split("@");
    const emailAddress = splitedText[1].split(".")[0];
    console.log(emailAddress);

    await page.locator("#username").fill(emailAddress);
    await page.locator("#password").fill(process.env.LOGIN_PRACTICE_PASSWORD);
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("Consultant");
    await page.locator("#signInBtn").click();
    await page.locator("#terms").click();
   // await page.pause();


});


test('demo page ', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").fill(process.env.RSA_USER_EMAIL);
    await page.locator("#password").fill(process.env.LOGIN_PRACTICE_PASSWORD);
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("Consultant");
    await page.locator("#signInBtn").click();
    await page.locator("#terms").click();
    //await page.pause();


});


test('network calls intercepting using route ', async ({ page }) => {


    // page.route('**/*.css', route => route.abort());
    // page.route('**/*.{jpg, png, jpeg}', route => route.abort());

    await page.goto("https://www.saucedemo.com/")
    await page.on('request', request => console.log(request.url()));
    await page.on('response', response => console.log(response.url(), response.status()));
   // await page.pause();


});

