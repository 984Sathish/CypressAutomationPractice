
import HomePage from "../PageObjects_Practice/HomePage";
import ProductPage from "../PageObjects_Practice/ProductPage";
import CheckOutPage from "../PageObjects_Practice/CheckOutPage";


describe('Page object reference', function(){

    before(function(){
        cy.fixture('example1').then(function(data){

            this.data = data
        })
    })

    it('POM', function(){ 

        const homePage = new HomePage()
        const productPage = new ProductPage()
        const checkOutPage = new CheckOutPage()

        //Cypress.env('url') is g"et from config properties.
        cy.visit(Cypress.env('url') + '/angularpractice')

        homePage.getName().type(this.data.name)
        homePage.getEmail().type(this.data.email)
        homePage.getPassword().type(this.data.password)
        homePage.getGender().select(this.data.gender)

        homePage.getShop().click()

        //Note: config will be applied only this spec file not applied in globally.
        Cypress.config('defaultCommandTimeout', 8000) 
 
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
})