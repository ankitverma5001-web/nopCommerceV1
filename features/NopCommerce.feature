Feature: nopcommerce application verification on msedge

Scenario Outline: order completion status
    Given user should login to nopcommerce website with username "<username>" and password "<password>"
    When user should add product "<productName>" to the cart
    When user navigate to cart page and completed product checkout with firstname "<firstname>" lastname "<lastname>" and postalcode "<postalcode>" to verify productname "<productName>"
    Then verify order successfully placed

Examples:
    | username                  | password          | productName                | firstname  | lastname  | postalcode |

    | standard_user             | secret_sauce      | Sauce Labs Bike Light      | james      | bond      | 007        |
    | performance_glitch_user   | secret_sauce      | Sauce Labs Backpack        | bruce      | wayne     | 123        |











   
