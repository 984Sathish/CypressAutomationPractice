describe('Cypress Custom Commands', function () {

    it('custom command', () => {
        cy.visit('https://the-internet.herokuapp.com/')

        //get size 
        const size = cy.get('ul li').getSize()

        //get text
        cy.get('ul li').first().getText()

        cy.visit('https://the-internet.herokuapp.com/tables')
        //get vaule from table
        cy.getTableValue(3,4)

    })


})