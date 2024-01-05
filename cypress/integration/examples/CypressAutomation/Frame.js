import 'cypress-iframe'  //To import all cypress iframe functions.

describe('Handing frame', function(){

    it('Frames', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //load frame before using frame elements
        cy.frameLoaded('#courses-iframe') 
        
        //using cy.iframe() only to using frame elements
        cy.iframe().find('[href="mentorship"]').eq(0).click()
    })
})