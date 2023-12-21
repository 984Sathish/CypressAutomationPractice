describe('Cypress Studio suite', function(){

    //note: How to launch cypress studio
    //1.add experimentalStudio: true in config file, 
    //2.run in testrunner 
    //3.hover on suite or test in runner UI.
    //4. then u can create new test and edit in existing test also.


    it('Cypress studio test', function(){
        cy.visit('https://demowebshop.tricentis.com/')
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.ico-login').click();
        cy.get('#Email').type('sathishsuresh@gmail.com');
        cy.get('#Password').type('Satz@984');
        cy.get('form > .buttons > .button-1').click();
        cy.get('.master-wrapper-content').click();
        cy.get('.block-category-navigation > .listbox > .list > :nth-child(1) > a').click();
        cy.get(':nth-child(1) > .product-item > .details > .add-info > .buttons > .button-2').click();
        cy.get('.close').click();
        cy.get('.ico-cart > .cart-label').click();
        cy.get('#termsofservice').check();
        cy.get('#checkout').click();
        cy.get('#billing-buttons-container > .button-1').click();
        cy.get('#shipping-buttons-container > .button-1').click();
        cy.get('#shipping-method-buttons-container > .button-1').click();
        cy.get('#payment-method-buttons-container > .button-1').click();
        cy.get('#payment-info-buttons-container > .button-1').click();
        cy.get('#confirm-order-buttons-container > .button-1').click();
        cy.get('strong').should('have.text', 'Your order has been successfully processed!');
        /* ==== End Cypress Studio ==== */
    })
})