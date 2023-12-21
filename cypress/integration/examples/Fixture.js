describe('Cypress Fixture', function () {

 

    it('Login with static data', () => {
        cy.visit('https://demowebshop.tricentis.com/')

        //login
        cy.get('.ico-login').click()
        cy.get('#Email').type("sathishsuresh@gmail.com")
        cy.get('#Password').type('Satz@984')
        cy.get('[value="Log in"]').click()
    })

    it('Login with fixture data inside the testcase', () => {
        cy.visit('https://demowebshop.tricentis.com/')

        //login
        cy.get('.ico-login').click()
        //get fixture data
        cy.fixture('example').then(user => {
            cy.get('#Email').type(user.email)
            cy.get('#Password').type(user.password)
        })
        cy.get('[value="Log in"]').click()
    })

    //Approach 1 - this ()
    // beforeEach(function () {
    //     cy.fixture('example').then((user) => {
    
    //       this.user = user
    //     })
    //   })

       // Approach 2 - as()
   beforeEach(function () {
      cy.fixture('example').as('user')
  })

    it('Login with fixture data in script level', function() {
        cy.visit('https://demowebshop.tricentis.com/')

        //login
        cy.get('.ico-login').click()
        cy.get('#Email').type(this.user.email)
        cy.get('#Password').type(this.user.password)
        cy.get('[value="Log in"]').click()
    })

    describe.only('Multiset data', function(){
       const multidata = [{fileName: "example"},{fileName: "LoginDetails"}]

    multidata.forEach(data => {
        describe("Fixture fileName - "+data.fileName, ()=> {
            beforeEach(function(){
                cy.fixture(data.fileName).as("userDetails")
            })
            it('Login test', function(){
                cy.visit('https://demowebshop.tricentis.com/')
                cy.get('.ico-login').click()
                cy.get('#Email').type(this.userDetails.email)
                cy.get('#Password').type(this.userDetails.password)
                cy.get('[value="Log in"]').click()
            })
        })
    })
})
    
})