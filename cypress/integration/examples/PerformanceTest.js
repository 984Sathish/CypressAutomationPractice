describe('Performance testsuite', function(){
    
    it('Lighthouse testing', function(){
        cy.visit('https://www.google.com/')

        //Lighthouse - has provided tools and metrics concerning applications performances
        cy.lighthouse()
    })

    it('Lighthouse testing with config', function(){
        cy.visit('https://demowebshop.tricentis.com/')
        cy.lighthouse({
            performance: 81,
            "best-practices": 92,
            accessibility: 92,
            seo: 0,
        },
        )
    })

    it('Accessibility testing', function(){
        cy.visit('https://www.google.com/')

        //Pa11y - has provided tools to analyze and improve the accessibility status of applications
        cy.pa11y()
    })

    it.only('Accessibility testing with config', function(){
        cy.visit('https://demowebshop.tricentis.com/')

        cy.pa11y({
            standard: "WCAG2AA" 
        }
        )
    })
})