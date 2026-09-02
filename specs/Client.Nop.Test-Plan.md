# Client Nop Commerce Test Scenarios and API Scenarios

## Application Overview

Create a detailed QA test plan for the client purchase flow and a separate API test section based on the application behavior implemented in the spec.

## Test Scenarios

### 1. UI application flow

**Seed:** `tests/Client.Nop.Spec.js`

#### 1.1. Valid login and product purchase flow

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Launch the application and navigate to the login page
    - expect: The login page is displayed and ready for user input.
  2. Enter valid credentials standard_user and secret_sauce
    - expect: The user is authenticated and redirected to the products page.
  3. Select Sauce Labs Bike Light and add it to the cart
    - expect: The product appears in the cart and the cart count increases.
  4. Open the cart and verify the selected product name
    - expect: The item in the cart matches Sauce Labs Bike Light exactly.
  5. Proceed to checkout and enter valid details james, bond, 007
    - expect: The checkout form accepts the information and the user can continue.
  6. Place the order and review completion
    - expect: The order confirmation page displays Thank you for your order!

#### 1.2. Invalid login flow

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Attempt login with a wrong username or password
    - expect: The login fails and the user remains on the login page or sees an error.
  2. Attempt login with empty fields
    - expect: The application blocks submission and asks for required values.
  3. Retry with valid credentials
    - expect: The user can access the products page successfully.

#### 1.3. Cart and checkout validation

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Add a product to the cart from the products page
    - expect: Only the intended item is added without duplicates.
  2. Open the cart and validate the product details
    - expect: The product name, description, and price are consistent with the selected item.
  3. Proceed to checkout and verify item review before payment/order completion
    - expect: The selected product is still the same one that was added.

#### 1.4. Order completion and navigation flow

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Complete the order after valid checkout data
    - expect: The confirmation page loads successfully.
  2. Click the back-to-products button
    - expect: The user returns to the products page and can start a new purchase.
  3. Verify no error banners or broken navigation remain
    - expect: The app remains stable and usable after completing the order.

### 2. API scenarios

**Seed:** `tests/Client.Nop.Spec.js`

#### 2.1. API login success and failure

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Send a valid login API request with known credentials
    - expect: The request is accepted and returns an authenticated session or token.
  2. Send an invalid login API request
    - expect: The request fails with a 401 or validation error.

#### 2.2. API product and cart operations

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Request the product list from the API
    - expect: The response returns a valid list of products and status code 200.
  2. Add a product to the cart through the API
    - expect: The cart response reflects the added item with a valid payload.
  3. Fetch current cart details
    - expect: The response shows the correct product in the cart.

#### 2.3. API order placement validation

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Submit a valid order API request with customer information and selected product
    - expect: The response indicates successful order creation.
  2. Submit an invalid order payload with missing required data
    - expect: The API returns a validation error and rejects the order.
  3. Verify the order status or confirmation details after creation
    - expect: The system shows the order as created and the delivery details are consistent.

### 3. SauceDemo login edge cases and alternate example user

**Seed:** `features/NopCommerce.feature`

#### 3.1. Login and full checkout with the performance_glitch_user example

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Log in with performance_glitch_user and secret_sauce
    - expect: Despite this account's known slower page rendering, login still succeeds and the products page loads.
  2. Select Sauce Labs Backpack and add it to the cart
    - expect: The product appears in the cart and the cart count increases.
  3. Open the cart and verify the selected product name
    - expect: The item in the cart matches Sauce Labs Backpack exactly.
  4. Proceed to checkout and enter details bruce, wayne, 123
    - expect: The checkout form accepts the information, and the item shown at the review step still matches Sauce Labs Backpack.
  5. Place the order
    - expect: The order confirmation page displays "Thank you for your order!"

#### 3.2. Data-driven checkout runs stay isolated across both example users

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Run the Scenario Outline's two examples (standard_user/Sauce Labs Bike Light and performance_glitch_user/Sauce Labs Backpack)
    - expect: Each example completes independently in its own fresh browser/context/page (per `features/support/hooks.js` Before/After), with no shared session state.
  2. Compare the product shown in the cart and at checkout review for each example run
    - expect: Each run shows only the product that example added — never a mix of both example rows' products.

#### 3.3. Checkout blocks submission with incomplete required fields

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Add a product to the cart and proceed to checkout
    - expect: The checkout form is displayed with first name, last name, and postal code fields.
  2. Leave one or more of first name, last name, or postal code empty and click Continue
    - expect: The app blocks proceeding to the review step or asks for the missing required value(s), mirroring the required-field handling already observed on login (see 1.2).
  3. Fill in all three fields and click Continue
    - expect: The checkout review step is reached and shows the correct product.

### 4. SauceDemo add-to-cart edge cases (source-level behavior)

**Seed:** `pageobjects/PortalPage.js`

#### 4.1. Ambiguous partial product name resolves to only the first match

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Log in and trigger add-to-cart with a partial name that matches more than one product (e.g. "Sauce Labs")
    - expect: `PortalPage.selectProductandAdd` matches by substring and clicks the first matching product's button, then stops (`break`) — only that one product is added, not every product containing the substring.
  2. Open the cart
    - expect: The cart contains exactly one item — the first product (in inventory DOM order) whose name contains the given substring.

#### 4.2. Adding a non-existent product name is a silent no-op

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Log in and trigger add-to-cart with a product name that does not exist in the inventory (e.g. "Nonexistent Product")
    - expect: No matching item is found, so `selectProductandAdd` clicks nothing and throws no error — this "silent success" is worth asserting explicitly since it currently has no test coverage.
  2. Open the cart
    - expect: The cart remains empty; no product name is shown.

### 5. SauceDemo HTTP-level checks

**Seed:** `tests/APIScenarios.spec.js`

#### 5.1. Home page availability and branding

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Send an HTTP GET request to `https://www.saucedemo.com`
    - expect: Response status is 200 and the response body contains "Swag Labs".

#### 5.2. Valid login redirects to the inventory page

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Submit valid credentials (standard_user / secret_sauce) through the login form
    - expect: The URL updates to match `/inventory.html`.
  2. Inspect the page after redirect
    - expect: The `[data-test="title"]` element is visible and the page body contains "Products".

#### 5.3. Invalid login surfaces the exact error banner

**File:** `specs/Client.Nop.Test-Plan.md`

**Steps:**
  1. Submit a valid username with an incorrect password
    - expect: The `[data-test="error"]` element becomes visible and contains the text "Epic sadface".
