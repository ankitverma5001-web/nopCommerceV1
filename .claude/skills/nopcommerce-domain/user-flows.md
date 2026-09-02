# User Flows Currently Automated

## SauceDemo checkout (Cucumber + plain Playwright duplicate)
1. Login with username/password
2. Add a named product to the cart from the inventory list
3. Open the cart, verify the product name shown matches
4. Go to checkout, fill first name / last name / postal code, continue
5. Verify the product name still shown at the checkout review step
6. Finish the order
7. Verify confirmation text "Thank you for your order!"

Automated identically in two places: `features/NopCommerce.feature` (Cucumber, 2 data-driven examples) and `tests/Client.Nop.Spec.js` (hardcoded single case, `james`/`bond`/`007`, "Sauce Labs Bike Light"). Keep both in sync if the flow changes, or consolidate — flag this duplication in reviews.

## SauceDemo negative login (`tests/APIScenarios.spec.js` only — no Cucumber equivalent)
- Invalid credentials → `[data-test="error"]` contains "Epic sadface"
- (HTTP-level) home page returns 200 and contains "Swag Labs"
- Valid login via UI → URL matches `/inventory.html`, title and "Products" text visible

## RahulShettyAcademy order lifecycle (API-driven setup + UI verification)
1. **Create** an order via API (`APiUtils.createOrder`) with a fixed country + product ID
2. Inject the returned token into `localStorage`, load the client UI, open "My Orders"
3. Find the row matching the created order ID, open its detail, read `.col-text`
4. **Delete** the order via API, assert the deletion success message

Variant in `WebAPIPart2.spec.js`: logs in through the UI instead of injecting a token, captures `storageState`, and reuses it in a second browser context — this test is currently incomplete (assertions are commented out; only navigation happens).

## Network interception demos (exploratory, not asserting business behavior)
- `NetworkTest1.spec.js`: rewrites the order-details request URL to a fixed order ID via `route.continue({ url })`, then reads an error/edge-state element (`.blink_me`) — appears to be probing what the UI shows for a specific (possibly invalid) order ID
- `NetworkTest2.spec.js`: fulfills the "get orders for customer" response with a fake empty payload to observe the empty-state UI text
- `tests/fixturesDemo.spec.js`: demonstrates a custom Playwright fixture (`authenticatedPage`, `createOrder`, `testdataforOrder` from `tests/utils/fixtures.js`) — the assertion only checks the created order ID appears in the orders table; not a full flow

## Login practice page demo (`UIBasicTest.spec.js`) — not tied to any spec doc
Two variants of: click a link that opens a new tab containing a dynamically generated email, extract the email's local part, use it as a username, fill password, accept a modal, pick a role, sign in, click terms. Both end in `page.pause()` — written for manual/interactive debugging, not CI.

## Not yet automated
GreenKart flows in `specs/GreenKart-Test-Plan.md` (catalog listing, search, add-to-cart/quantity adjust, remove item, checkout, nav links) — see `./test-targets.md` §4.
