describe('Handle Alerts', function(){

    it('Alert:OK', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#alertbtn').click() //click alert button

        //Note: alerts are automatically handling by cypress but we want to verify alert text or other action, 
        //we need to fire the alert then handled it.

        cy.on('window:alert', (str) => {

            //Mocha framework - handle window alert like below
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

    })

    it('Alert:Confirm', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#confirmbtn').click()
        cy.on('window:confirm', (str) => {

            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

    })
})