# API Reference — RahulShettyAcademy client e-commerce

Base: `https://rahulshettyacademy.com/api/ecom`. Used by `tests/utils/APiUtils.js` and directly by `tests/NetworkTest2.spec.js` / `tests/NetworkTest1.spec.js` (route interception).

| Method | Endpoint | Auth | Payload / Notes |
|---|---|---|---|
| POST | `/auth/login` | none | `{ userEmail, userPassword }` → `{ token, ... }`. Token is used as a raw `Authorization` header value (not `Bearer <token>`) in this repo's helper — see `APiUtils.getToken()`. |
| POST | `/order/create-order` | `Authorization: <token>` | `{ orders: [{ country, productOrderedId }] }` → `{ orders: [orderID, ...] }`. `APiUtils.createOrder()` returns `{ token, orderID }`. |
| DELETE | `/order/delete-order/{orderID}` | `Authorization: <token>` | → `{ message: "Orders Deleted Successfully" }` on success. |
| GET | `/order/get-orders-for-customer/*` | (customer id in path/query, called from browser context with token in localStorage) | Returns the orders list rendered on the "My Orders" page. Intercepted/faked in `NetworkTest2.spec.js` to simulate an empty-orders state (`{ data: [], message: "No Orders" }`). |
| GET | `/order/get-orders-details?id=*` | browser context | Order detail lookup. Intercepted in `NetworkTest1.spec.js` via `route.continue({ url: ... })` to force a specific order ID and reach an error/edge state (`.blink_me` element). |

## UI routes (same app)
- `https://rahulshettyacademy.com/client/#/auth/login` — login form (`#userEmail`, `#userPassword`, `#login`)
- `[routerlink*=myorders]` — nav link to the orders list
- Orders table: `tbody tr`, each row's ID in `th`, action button in the row, detail text in `.col-text` / `.mt-4`

## Known helper quirks (account for these when writing new API-driven tests)
- `APiUtils.createOrder()` always uses the module-level `loginPayload`/`orderPayload` passed into its constructor — callers build a fresh `APiUtils` per test file rather than parameterizing per-call.
- `APiUtils.deleteOrder()` fetches a **new** token internally (`await this.getToken()`) rather than reusing the one from `createOrder()` — two logins happen per create+delete cycle.
- Test data (`country: "Azerbaijan"`, `productOrderedId: "6960eac0c941646b7a8b3e68"`) is hardcoded and duplicated across `WebAPIPart1.spec.js`, `WebAPIPart2.spec.js`, and `NetworkTest2.spec.js` rather than shared from one place.
