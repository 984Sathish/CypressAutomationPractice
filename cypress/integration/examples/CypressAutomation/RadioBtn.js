describe('Handle radio buttons', function(){

    it('Click on Radio button', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('[value="radio3"]').check().should('be.checked')
    })
})