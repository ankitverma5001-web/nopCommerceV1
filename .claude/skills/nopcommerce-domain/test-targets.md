# Test Targets

This repo automates three unrelated public sites, plus one planned-but-unimplemented app. Always confirm which target a file exercises before reusing its patterns.

## 1. SauceDemo (`https://www.saucedemo.com`)
The only app with a proper POM + Cucumber BDD suite. Mislabeled "nopcommerce" in `features/NopCommerce.feature`.

- **Automated by**:
  - `features/NopCommerce.feature` + `features/step-definations/steps.js` (Cucumber) — Scenario Outline "order completion status", 2 examples (`standard_user`/`performance_glitch_user`, both password `secret_sauce`)
  - `pageobjects/{LoginPage,PortalPage,CartPage,CheckoutPage,OrderReviewPage,POManager}.js` — POM used by both the Cucumber steps and `tests/Client.Nop.Spec.js`
  - `tests/Client.Nop.Spec.js` — same flow as the feature file, written directly as a Playwright test (no Cucumber)
  - `tests/APIScenarios.spec.js` — HTTP-level checks against saucedemo.com (home page 200 + "Swag Labs" text, valid login redirects to `/inventory.html`, invalid login shows "Epic sadface" error)
  - `tests/NetworkTest1.spec.js` (`test.only('network calls intercepting using route ...')`) — logs all requests/responses on saucedemo.com; **has `test.only`, so if this file is ever run alongside others in the same `describe`, only this test executes**
- **Flow**: login → add product to cart by name → open cart → verify item → checkout (first/last name + postal code) → verify item at checkout → finish → verify "Thank you for your order!" → back to products
- **Test users**: `standard_user` / `secret_sauce`, `performance_glitch_user` / `secret_sauce` (both public SauceDemo demo accounts, not secrets)
- **Products referenced**: "Sauce Labs Bike Light", "Sauce Labs Backpack"

## 2. RahulShettyAcademy client e-commerce (`https://rahulshettyacademy.com/client`)
A separate demo app with its own REST API (`/api/ecom/...`). No POM — raw locators inline in each spec.

- **Automated by**: `tests/WebAPIPart1.spec.js`, `tests/WebAPIPart2.spec.js`, `tests/NetworkTest2.spec.js`, `tests/fixturesDemo.spec.js`, plus the shared helpers `tests/utils/APiUtils.js` and `tests/utils/fixtures.js`
- **Flow variants exercised**:
  - Create an order via API (`APiUtils.createOrder`), inject the returned token into `localStorage`, load the UI, navigate to "My Orders", find the row matching the created order ID
  - Log in through the UI (`#userEmail`/`#userPassword`/`#login`), save `storageState`, reuse it for a second context (`WebAPIPart2.spec.js`)
  - Intercept and rewrite the "get orders for customer" response with a fake empty payload (`NetworkTest2.spec.js`) to test an empty-orders UI state
  - Delete an order via API and assert the "Orders Deleted Successfully" message
- **Credentials**: `WebAPIPart1/2.spec.js`, `NetworkTest2.spec.js`, and `tests/utils/fixtures.js` all hardcode `userEmail: "ankitverma5001@gmail.com"` / `userPassword: "Flanker20#"` in plaintext — this is a **real personal account**, not demo/throwaway data like the SauceDemo credentials above. Flag this in any review; do not propagate the pattern into new files (see `playwright-cucumber-best-practices` skill's anti-patterns section).
- Full endpoint list: `./api-reference.md`

## 3. RahulShettyAcademy login practice page (`https://rahulshettyacademy.com/loginpagePractise/`)
- **Automated by**: `tests/UIBasicTest.spec.js` (two ad-hoc demo tests, both call `page.pause()` at the end — these are exploratory/manual-debugging tests, not CI-safe assertions)
- Also hardcodes a real-looking credential pair (`Learning@830$3mK2`) and the same personal email in one variant.
- Not connected to any spec/scenario doc — treat as scratch/demo code, not a maintained suite.

## 4. GreenKart (planned only — no test files exist yet)
- `specs/GreenKart-Test-Plan.md` documents a full scenario set (catalog listing, search, add-to-cart/quantity, remove item, checkout, nav links) with seed `tests/seed.spec.ts` and specs under `tests/greenkart/*.spec.ts`.
- **None of those files exist in the repo.** If asked to "generate tests for GreenKart", this is a from-scratch implementation task, not a fix/extend task — say so before writing anything, and confirm the actual GreenKart URL (not present anywhere in the current codebase).
