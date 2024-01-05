/// <reference types="Cypress" />

describe('Basic cypress commands suite', function() {

    it('order product: scenario', function() {

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        //cy.wait(2000) --> wait 2 sec

        //get all elements(visible + invisible)
        cy.get('.product').should('have.length', 5) 

        //get visible elements only. and have.length is verify the length of the elements list
        cy.get('.product:visible').should('have.length', 4)

        //using index to click
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        //dynamically verify text 'Cashews' and click add to cart
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const txtveg = $el.find('h4.product-name').text()
            if(txtveg.includes('Cashews')){ 
                cy.wrap($el).find('button').click()
            }
        })

        //cypress is not working async promise directly. like cy.get(element).text() is not working.
        cy.get('.brand').then(function(logoElements){
            cy.log(logoElements.text())
        })

        //have.text is verify(assert) text displayed in the element
        //cy.get('brand').should('have.text', 'GREENKART')


        //Alisas name : To add the name of elements.
        cy.get('.products').as('productLocator')

        //place order
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click().then(function(){
            cy.log('Check out successfully')
        })
        cy.contains('Place Order').click().then(function(){
            cy.log('Ordered successfully')
        })

        //select India from static dropdown
        cy.get('select').select('India').should('have.value', 'India')

        //check 'agree' checkbox
        cy.get('.chkAgree').check().should('be.checked')

        //click procced.
        cy.contains('Proceed').click()        

    })

} )