describe('Handle multiple test data set', function(){

    before(function(){
        cy.fixture('example1').then(function(data){

            this.data = data
        })
    })

    it('Multiset data: Array concept', function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')
        this.data.productName.forEach(function(productText) {
            cy.selectProduct(productText)
        });

    })
})