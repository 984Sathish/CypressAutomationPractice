describe('Handle Checkboxes', function(){

    it('checkbox check and uncheck', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //handle check boxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').should('have.length', 3).check(['option2', 'option3'])
    })
})