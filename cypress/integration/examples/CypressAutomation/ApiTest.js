describe('API test', function(){

    it('Add book: Post API', function(){ 

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {

        "name": "Learn API automation in cypress",
        "isbn": "bcdsss",
        "aisle": "22s7",
        "author": "John foe"
 
        }).then(function(response)
        {
            expect(response.body).to.have.property("Msg", "successfully added")
        })

    })
    
})