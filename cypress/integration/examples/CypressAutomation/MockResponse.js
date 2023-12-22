describe('Mock response test' , function(){

    it('Mock book list from library', function(){

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        
        },
             
        {

            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "RSU",
                "aisle": "2301"   }]
        }).as('bookList')

        cy.get('[data-target="#exampleModal"]').click()
        cy.wait('@bookList').then(({request, response}) => {

           cy.get('table.table tr').should('have.length', response.body.length+1)  
        })
        cy.get('app-library-dashboard p').should('have.text', 'Oops only 1 Book available')


    })


    it('Mock Request URL', function(){

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
        
        req.continue((res) => {

            //expect(res.statusCode).to.equal(403)
        })
        }).as('dummyURL')

        cy.get('[data-target="#exampleModal"]').click()
        cy.wait('@dummyURL')
    })
})