describe('Handle Visible and invisible elements using assertion', function(){

    it('Verify Invisibility', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //check invisibility
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
    })

    it('Verify Visibility', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //check visibility
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })
})