describe('Hooks suite', function(){

    before(function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('a.navbar-brand').then(function(brandName){
        const name = brandName.text()
        if(name == 'ProtoCommerce'){
            cy.log('Login successfully')
        }
       })
        
    })

    beforeEach(function(){
        
          cy.visit('https://rahulshettyacademy.com/angularpractice/')
        
    })

    after(function(){
        cy.url().should('include', 'angularpractice')
    })

    afterEach(function(){

        cy.get('.btn').should('be.visible')
    })

    it('test before hooks', function(){
        cy.get('div.form-group [name="name"]').type('testUser')
        cy.get('[name="email"]').type('textUser@gmail.com')
        cy.get('#exampleInputPassword1').type('textPass')

    })

    it('text before each hooks', function(){
        cy.get('div.form-group [name="name"]').type('testUser2')
        cy.get('[name="email"]').type('textUser2@gmail.com')
        cy.get('#exampleInputPassword1').type('textPass2')

    })

})