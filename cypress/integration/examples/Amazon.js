///<reference types="Cypress" />
describe('Amazon automation', function () {

    it.skip('Place Order in Amazon with login', function () {

        cy.visit('https://www.amazon.in/')
        cy.get('#nav-al-signin').invoke('show')

        cy.get('#nav-flyout-ya-signin .nav-action-signin-button').click({ force: true })

        cy.get('#ap_email').type('9171171148')
        cy.get('#continue').click()

        cy.get('#ap_password').type('984894')
        cy.get('#signInSubmit').click()

        cy.get('#twotabsearchtextbox').type('samsungs23')
        cy.wait(2000)


        cy.get('.left-pane-results-container').find('.s-suggestion-container [role="button"]').each(($el, index, $list) => {
            cy.log($el.find('span').text())
            const prodText = $el.find('span').text()
            if (prodText == 'samsung s23') {
                cy.wrap($el).click()
            }

        })

        cy.get('a[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]').eq(1).then(function (el) {
            const url = el.prop('href')
            cy.visit(url)
            // cy.get('a[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]').eq(1).click()


            cy.get('#add-to-cart-button').click({ force: true })
            cy.get('#attach-close_sideSheet-link').click()
            cy.get('#nav-cart').click()

            //get total price in cart
            
            cy.get('#sc-subtotal-amount-activecart span').eq(0).then(function (element) {
                const price = element.text()
                cy.log(price)
            })

            //check each product price in cart
            let productprice;
            let totalprice;
            cy.get('[data-name="Active Items"]').find('[class="a-row sc-list-item sc-java-remote-feature"]').
                each(($el, index, $list) => {
                   
                    productprice = $el.find('.sc-badge-price-to-pay span.a-size-medium').text()
                    cy.log(productprice)
                  
                  //  cy.wrap($el).find('[data-feature-id="delete"] input').click()
        
                })

                let size;
                cy.get('[data-name="Active Items"]').find('[data-feature-id="delete"] input').then(function(element) {
                    size = element.length
                    cy.log(size)
                })
                cy.log(size)
                for (let i = 0; i < size; i++) {
                    cy.get('[data-name="Active Items"]').find('[data-feature-id="delete"] input').eq(i).click()
                    
                }               
        })
    })

    it('Product add to cart without login', ()=> {
        cy.visit('https://www.amazon.in/')

        cy.get('#twotabsearchtextbox').type('samsungs23')
        cy.wait(2000)

        cy.get('.left-pane-results-container').find('.s-suggestion-container [role="button"]').each(($el, index, $list) => {
            cy.log($el.find('span').text())
            const prodText = $el.find('span').text()
            if (prodText == 'samsung s23') {
                cy.wrap($el).click()
            }
        })

        cy.get('a[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]').eq(1).then(function (el) {
            const url = el.prop('href')
            cy.visit(url)
            cy.get('#add-to-cart-button').click({ force: true })
            cy.get('#attach-close_sideSheet-link').click()
            cy.get('#nav-cart').click()
        })
    })
})