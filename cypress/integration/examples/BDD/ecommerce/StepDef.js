import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import ProductPage from "../PageObjects_Practice/ProductPage";
import CheckOutPage from "../PageObjects_Practice/CheckOutPage";

Given('Open Ecommerce Page', () => {

    cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('Search & Add product to cart', () => {

    const productPage = new ProductPage()

    productPage.getProductTitle().each(($el, index, $list) => {
        const productName = $el.text()
       if(productName == 'Nokia Edge'){
            productPage.getProductAddToCart().eq(index).click()
           }
       })

    this.data.productName.forEach(function(productText) {
        cy.selectProduct(productText)
    });

    productPage.getCheckout().click()

})

And('Validate product total price', ()=> {

    const checkOutPage = new CheckOutPage()

     //Verify each price sum with the total price amount.
     var sum = 0;
     cy.get('tr td:nth-child(4) strong').each(($e1, index, $list) => {

         const price = $e1.text()
         var res = price.split(" ")
         res =  res[1].trim()
         sum = Number(sum) + Number(res) //sum => sum of each product price

     }).then(function(){

         cy.log("Sum price: "+sum)

         checkOutPage.getTotalAmount().then(function(element){

             const totalCost = element.text()
             var total = totalCost.split(" ")
             total = total[1].trim() //total => total price amount
             cy.log("Total price: "+Number(total))

             //verify sum and total
             expect(sum).to.equal(Number(total))
         })
     })
})

Then('Slect country and submit and verify thankyou message', ()=> {
    const checkOutPage = new CheckOutPage()
   //click checkout 
   checkOutPage.getCheckOut().click()

   //type country name
   checkOutPage.getCountry().type('India')

   //select suggestion
   checkOutPage.getCountrySuggestion().click()

   //check agree checkbox
   checkOutPage.getAgreeCheckBox().check({force: true}).should('be.checked')

   //click on purchase
   checkOutPage.getPurchase().click()

   //validate success message
   checkOutPage.getOrderSuccessMsg().should('contain.text', 'Success! Thank you! Your order will be delivered in next few weeks :-)')

})

