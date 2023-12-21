import{Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import loginObj from "../Cucumber/Login"

Before(() => {
    cy.log("Login Tests - Started")
});

After(() => {
    cy.log("Login Tests - Finished")
});

Given("Navigate to login page", ()=> {
    cy.visit('https://demowebshop.tricentis.com/login')
})

When("Enter username and password", ()=> {
    loginObj.email.type('sathishsuresh@gmail.com')
    loginObj.password.type('Satz@984')
    loginObj.submitBtn.click()
})

Then("Check HomePage is displayed", ()=> {
    loginObj.LogoBtn.click()
})