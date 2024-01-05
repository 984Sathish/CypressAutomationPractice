describe('API test', function(){

    it('Login to Application', function(){

        cy.request('POST', 'https://demowebshop.tricentis.com/login', 
         {
            "Email": "sathishsuresh@gmail.com",
            "Password": "Satz@984",
            "RememberMe": "false"
         }
        ).then(function(response){

            expect(response.status).to.equal(200)
        })
    })
})