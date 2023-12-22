describe('Handle debugging', function(){

it('text before each hooks', function(){

    cy.visit('https://rahulshettyacademy.com/angularpractice/')
    cy.get('div.form-group [name="name"]').type('testUser2')
    cy.get('[name="email"]').type('textUser2@gmail.com')

    //debug or pause the execution
    cy.pause() 

    cy.get('#exampleInputPassword1').type('textPass2')

    })

})