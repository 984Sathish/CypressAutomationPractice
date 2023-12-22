describe('Handling mouse hover', function(){

    it('MouseOver and force clicking', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Mouse over is not support in cypress.
        //'show' command will show the invisibile element in the mourse hover elements without hovering
        //note: only immediate parent will need to put to show the child elements like 'div.mouse-hover-content'
        cy.get('div.mouse-hover-content').invoke('show')

        cy.get('[href="#top"]').click({force: true}) //force click to clicking hover elemtent ex.Top
        cy.url().should('include', 'top')
    })
})