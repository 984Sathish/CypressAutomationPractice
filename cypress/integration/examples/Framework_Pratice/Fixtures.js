describe('fixture usage', function(){

    before(function(){
        cy.fixture('example1').then(function(data){

            this.data = data
        })
    })

    it('fixture', function(){
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('div.form-group [name="name"]').type(this.data.name)
        cy.get('[name="email"]').type(this.data.email)
        cy.get('#exampleInputPassword1').type(this.data.password)
        cy.get('select').select(this.data.gender)

    })
} )