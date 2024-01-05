describe('window handling', function(){

    it('remove attribute method to handle winodw ', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#opentab').invoke('removeAttr', 'target').click() //remove 'target' attribute from DOM
    })

    it('Origin method to handle window', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#opentab').click() 
        cy.origin('https://www.qaclickacademy.com/', ()=> {
             
            cy.get('#navbarSupportedContent [href*= "about"]').click()
        })
    })
})