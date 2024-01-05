Feature: Ecommerce Validation

    Application Regression

    Scenario: order Ecommerce product 
    Given Open Ecommerce Page
    When Search & Add product to cart
    And Validate product total price 
    Then Slect country and submit and verify thankyou message