---
name: playwright-cucumber-best-practices
description: Playwright + Cucumber testing standards observed in this repo — POM conventions, hooks, config, reporting, and known anti-patterns to avoid repeating. Auto-loaded reference for the create-scenarios/generate-tests/review-tests/test-strategy agents; not user-invocable.
disable-model-invocation: true
---

# Testing Standards for This Repo

This repo runs two parallel test styles against the targets described in
`nopcommerce-domain`: Cucumber BDD (`features/`, SauceDemo only) and plain
Playwright Test specs (`tests/`, all targets). Follow the convention that
matches the file you're touching — don't introduce Cucumber for a
`tests/` API spec, or a raw `page.goto` for a SauceDemo flow that already
has a POM.

## Page Object Model (`pageobjects/` + `POManager`)
- One class per page, constructor takes `page` and defines all locators as `this.page.locator(...)` fields — never look up a locator inline inside an action method
- `POManager` is the single entry point: instantiate it once per test/scenario (`new POManager(this.page)` in Cucumber, `new POManager(page)` in Playwright specs) and reach pages via `getXPage()` getters — don't `new LoginPage(page)` directly in a test/step
- Action methods do the interaction AND, where relevant, the assertion for that page (see `CartPage.verifyItemInCart`, `CheckoutPage.verifyItemInCheckout`) — keep that pairing when extending a page object
- Only extend this POM for SauceDemo. Other targets (RahulShettyAcademy client, GreenKart) have no POM yet — if a suite for them grows past 2-3 specs, propose introducing one rather than continuing to inline locators

## Cucumber conventions (`features/`)
- One `.feature` file per app area; `Scenario Outline` + `Examples` table for data-driven cases (see `NopCommerce.feature`)
- Step definitions live in `features/step-definations/steps.js` (yes, "definations" — match the existing folder name exactly, don't silently "fix" the typo in new files without calling it out)
- `features/support/hooks.js` owns browser lifecycle: `Before` launches a fresh `chromium` browser/context/page per scenario, `After` tears it down. Don't launch a browser inside a step definition.
- Cucumber runs independently of `playwright.config.js` (that config's `testDir` is `./tests`, so it never picks up `.feature` files) — run BDD suites with `npx cucumber-js`, not `npx playwright test`

## Playwright Test conventions (`tests/`)
- `playwright.config.js`: 3 projects (`chrome`, `msedge`, `firefox`), `headless: false`, `trace: on`, `screenshot: only-on-failure`, global `expect` timeout 20s, test timeout 50s, reporters are `html` + `allure-playwright`
- API-driven setup uses a small helper class (`tests/utils/APiUtils.js`) constructed with an API request context + payload, not ad-hoc `request.post()` calls scattered through the test
- Custom fixtures (`tests/utils/fixtures.js`, `base.test.extend(...)`) are the preferred way to share an authenticated page or pre-created order across tests in a file — prefer this over repeating login/setup steps inline once a spec needs the same setup twice
- Run a single file: `npx playwright test tests/<file>.spec.js --reporter=line`
- Allure report: `npx allure generate allure-results --clean -o allure-report && npx allure open allure-report` (no npm script wraps this yet — `package.json` has no `scripts` defined at all)

## Locators
- Prefer real `data-test`/`data-testid` attributes when the target app has them (SauceDemo does — see `tests/APIScenarios.spec.js` for the canonical selectors) over class names or text matches
- Avoid `button:has-text("View")`-style text locators when a stable attribute exists nearby — text copy is the first thing that changes
- No XPath, no brittle nth-index locators except where the app genuinely gives no other hook (e.g. looping `.inventory_item` cards by their inner text — acceptable there since SauceDemo has no per-product `data-test`)

## Anti-patterns found in this repo — do not repeat these in new/generated code
- **Hardcoded personal credentials in plaintext**: `WebAPIPart1.spec.js`, `WebAPIPart2.spec.js`, `NetworkTest2.spec.js`, `tests/utils/fixtures.js`, and `UIBasicTest.spec.js` all hardcode a real email/password pair directly in source. Flag this in every review; new tests should read credentials from environment variables or a local, gitignored fixture file instead.
- **`test.only` left in committed code**: `tests/NetworkTest1.spec.js` has `test.only(...)` — fine for local debugging, should not ship, since it silently skips sibling tests in the same file/run.
- **`page.pause()` left in committed code**: both tests in `UIBasicTest.spec.js` end with `page.pause()`, which hangs headless/CI runs waiting for manual interaction.
- **Undefined variable in a hook**: `features/support/hooks.js` `AfterStep` does `path: snapfirststack.png` — `snapfirststack` is not a string or a declared variable, so this throws a `ReferenceError` the moment a step fails, masking the real failure. Should be a string path, e.g. `` `screenshots/${this.pickle?.name}.png` ``.
- **Commented-out / dead assertions**: `WebAPIPart2.spec.js`'s `demo page` test has no real assertions (everything past navigation is commented out) — don't leave a "test" that can't fail; either finish it or mark it `test.fixme()` with a reason.
- **Duplicated hardcoded test data** across files (`country: "Azerbaijan"`, the same `productOrderedId`) instead of one shared fixture/constant.

## Reporting
Allure results accumulate in `allure-results/`; HTML report also written by the `html` reporter to `playwright-report/`. Don't assume either directory is clean between local runs — recommend `--clean` when generating Allure reports for review.
