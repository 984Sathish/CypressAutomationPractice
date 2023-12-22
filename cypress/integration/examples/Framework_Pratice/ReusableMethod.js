describe('Reusing code', function(){

    it('Reusable method: click add to cart with the specfic ', function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

        //call reusable function and prameterized test data concept
        cy.selectProduct('Blackberry')
    })
})  