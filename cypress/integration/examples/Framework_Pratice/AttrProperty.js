describe('validating attribute property and their behaviour', function(){

    before(function(){
        cy.fixture('example1').then(function(data){
            this.data = data
        })
    })
    it('Attribute property', function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        //validate name value in h4 tag element
        //cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name) 
        
        //'have.attr' command get the 'minlength' attribute value and verify with '2' value u given
        cy.get('div.form-group [name="name"]').should('have.attr', 'minlength', '2')

        //verify element is disabled
        cy.get('#inlineRadio3').should('be.disabled')

    })
})