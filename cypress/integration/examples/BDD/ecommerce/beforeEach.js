beforeEach(() => {

    cy.fixture('example1').then(function(data){
    this.data = data
    })
    
});