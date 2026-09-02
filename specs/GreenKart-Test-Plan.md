# GreenKart QA Test Plan

## Application Overview

GreenKart is a simple vegetable and fruit e-commerce app with a search box, product cards, cart summary, and a checkout flow. The plan covers the primary shopping journey, search behavior, quantity updates, cart actions, and navigation links.

## Test Scenarios

### 1. GreenKart shopping flows

**Seed:** `tests/seed.spec.ts`

#### 1.1. Load catalog and verify product listing

**File:** `tests/greenkart/catalog-listing.spec.ts`

**Steps:**
  1. Open the GreenKart home page
    - expect: The page loads successfully with the GreenKart title and product grid visible.
  2. Review the header and product cards
    - expect: Each product shows a name, price, quantity controls, and an ADD TO CART button.
  3. Scroll through the catalog
    - expect: Multiple products remain visible and the grid layout is consistent.

#### 1.2. Search for a valid product

**File:** `tests/greenkart/search-valid-product.spec.ts`

**Steps:**
  1. Type a valid product name such as 'Tomato' into the search box
    - expect: Only matching products are shown or the relevant product is surfaced in the grid results.
  2. Clear the search term
    - expect: The full product catalog is restored.
  3. Search for a non-existent item
    - expect: The app shows no matching products or a clear empty state without breaking the page.

#### 1.3. Add a product to cart and update quantity

**File:** `tests/greenkart/add-to-cart-qty.spec.ts`

**Steps:**
  1. Click ADD TO CART on a product such as Brocolli
    - expect: The product is added to the cart and the cart count and summary update.
  2. Open the cart
    - expect: The cart displays the selected product, unit price, quantity, and total.
  3. Increase the quantity using the + control
    - expect: The quantity and total price increase correctly.
  4. Decrease the quantity using the - control
    - expect: The quantity and total price decrease and do not go below zero or invalid values.

#### 1.4. Remove an item and verify empty-cart behavior

**File:** `tests/greenkart/remove-item-empty-cart.spec.ts`

**Steps:**
  1. Add at least one product to the cart
    - expect: The cart contains one or more items.
  2. Click the remove icon for an item
    - expect: The item disappears from the cart and the totals are recalculated.
  3. Remove the final item
    - expect: The cart is empty or displays a clear empty state and no invalid totals remain.

#### 1.5. Proceed to checkout with valid cart contents

**File:** `tests/greenkart/proceed-to-checkout.spec.ts`

**Steps:**
  1. Add multiple products to the cart
    - expect: The cart summary shows the correct item count and total price.
  2. Click PROCEED TO CHECKOUT
    - expect: The checkout flow opens successfully with the expected line items and pricing totals.
  3. Verify the order summary
    - expect: The selected products, quantities, and amounts match what was added to the cart.

#### 1.6. Check navigation and static links

**File:** `tests/greenkart/navigation-links.spec.ts`

**Steps:**
  1. Click Top Deals in the header
    - expect: The offers page loads and displays the expected special deals content.
  2. Click Flight Booking
    - expect: The user is redirected to the flight booking site without a broken navigation state.
  3. Click Cart from the header
    - expect: The cart overview opens correctly from the current page state.
