---
name: nopcommerce-domain
description: Domain knowledge for this repo's test targets, API endpoints, selectors, and user flows. Auto-loaded reference for the create-scenarios/generate-tests/review-tests/test-strategy agents; not user-invocable.
disable-model-invocation: true
---

# Repo Domain Knowledge

## Important: this is not actually "nopCommerce"

Despite the repo/package name (`nopcommerce`) and the feature title in
`features/NopCommerce.feature` ("nopcommerce application verification on msedge"),
none of the automated flows exercise a real nopCommerce site. This repo is a
**QA automation practice/portfolio project** that drives three unrelated public
demo apps. Do not assume nopCommerce business rules, URLs, or selectors —
always verify against the actual target for the flow you're working on
(see `./test-targets.md`).

## Read these before working on tests/scenarios/reviews
1. `./test-targets.md` — the actual apps under test and which files exercise each
2. `./user-flows.md` — the flows currently automated (and one planned-but-missing suite)
3. `./api-reference.md` — REST endpoints used by the RahulShettyAcademy client API tests
4. `./ui-selectors.md` — selectors already in use, by page object / spec file

## Repo shape
```
nopCommerceV1/
├── features/                    # Cucumber BDD (SauceDemo checkout flow only)
│   ├── NopCommerce.feature
│   ├── step-definations/steps.js   # note: "definations" typo is the real folder name
│   └── support/hooks.js
├── pageobjects/                  # POM classes + POManager, used by BOTH Cucumber steps and tests/Client.Nop.Spec.js
├── tests/                        # Plain Playwright specs (not Cucumber) — mixed targets, see test-targets.md
│   └── utils/                    # APiUtils (REST helper class), fixtures.js (custom Playwright fixtures)
├── specs/                        # Markdown test plans ("Seed: <file>" + numbered steps/expect format)
└── playwright.config.js          # testDir: tests/ only — does NOT run features/ (Cucumber runs separately via npx cucumber-js)
```

Two independent test runners exist side by side:
- **Playwright Test** (`npx playwright test`) — runs everything under `tests/`
- **Cucumber** (`npx cucumber-js`) — runs `features/*.feature`, driven by its own `Before`/`After` hooks that launch a fresh browser per scenario (not via `playwright.config.js`)

There is no `cucumber.js` config file in the repo; cucumber-js falls back to its
default convention of picking up `features/**/*.feature` and step defs under
`features/`, which happens to match this layout.
