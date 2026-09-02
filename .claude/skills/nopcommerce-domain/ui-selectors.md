# UI Selectors In Use

## SauceDemo — via `pageobjects/` POM
| Page Object | Element | Selector |
|---|---|---|
| `LoginPage` | username | `input[data-test='username']` |
| `LoginPage` | password | `input[data-test='password']` |
| `LoginPage` | submit | `.submit-button` (class-based — see best-practices skill for the fix) |
| `PortalPage` | product cards | `.inventory_item`, name within card `.inventory_item_name`, add button `button` (first button in the matched card, found by looping + text match — no `data-testid` per product) |
| `CartPage` | cart icon | `.shopping_cart_link` |
| `CartPage` | product name in cart | `.inventory_item_name` |
| `CheckoutPage` | checkout button | `.checkout_button` |
| `CheckoutPage` | first/last name, postal code | `#first-name`, `#last-name`, `#postal-code` |
| `CheckoutPage` | continue | `#continue` |
| `OrderReviewPage` | finish | `#finish` |
| `OrderReviewPage` | confirmation text | `.checkout_complete_container h2` (expected: "Thank you for your order!") |
| `OrderReviewPage` | back to products | `#back-to-products` |

Note: `tests/APIScenarios.spec.js` uses the **real SauceDemo `data-test` attributes** directly (`[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`, `[data-test="error"]`, `[data-test="title"]`) — these are more robust than the POM's mixed class/data-test selectors above and should be preferred when adding new SauceDemo coverage.

## RahulShettyAcademy client
| Element | Selector |
|---|---|
| Email / password / login button | `#userEmail`, `#userPassword`, `#login` |
| My Orders nav link | `[routerlink*=myorders]` |
| Orders table | `tbody`, rows `tbody tr`, row id `th`, action button `button` (first in row) |
| Order detail text | `.col-text` or `.mt-4` depending on flow |
| Error/edge-state banner | `.blink_me` |
| "View" button (order detail) | `button:has-text("View")` — text-based locator, brittle if button copy changes |

## RahulShettyAcademy login practice page
| Element | Selector |
|---|---|
| Trigger link | `.blinkingText` |
| Extracted email display | `.red` |
| Username / password | `#username`, `#password` |
| Checkbox | `.checkmark` (`.last()`) |
| Modal confirm | `#okayBtn` |
| Role select | `select.form-control` |
| Sign in | `#signInBtn` |
| Terms checkbox | `#terms` |

## GreenKart (not yet implemented — no selectors captured)
`specs/GreenKart-Test-Plan.md` references product cards, quantity +/- controls, ADD TO CART, cart summary, PROCEED TO CHECKOUT, and header links (Top Deals, Flight Booking, Cart) only in prose. Selectors must be discovered from the live app before writing any GreenKart test.
