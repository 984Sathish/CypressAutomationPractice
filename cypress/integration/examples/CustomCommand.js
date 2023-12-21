describe('Cypress Custom Commands', function () {

    it('custom command', () => {
        cy.visit('https://the-internet.herokuapp.com/')

        const size = cy.get('ul li').getSize()
        cy.get('ul li').first().getText()

        cy.visit('https://the-internet.herokuapp.com/tables')
        cy.getTableValue(3,4)

    })


})