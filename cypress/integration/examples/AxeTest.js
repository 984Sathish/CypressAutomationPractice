describe('Accessibility test suite', function(){

    beforeEach(function(){
        cy.visit('https://demowebshop.tricentis.com/')
        cy.injectAxe()
    })

    it.skip('Accessibility testcase', function(){
        //cy.checkA11y() -> check by default
        //cy.checkA11y("a") -> check only 'a' tag

        cy.checkA11y(
            {exclude: ['a']}, //a or div
            {includedImpacts: ['critical']},
            
        )
    })

    
})