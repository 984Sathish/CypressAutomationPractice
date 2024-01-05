
describe('DemoWebShop Application', function () {

    it('Login API ', function () {

        //Approach 1
        cy.request('POST', 'https://demowebshop.tricentis.com/login',
            {
                "Email": "sathishsuresh@gmail.com",
                "Password": "Satz@984",
                "RememberMe": "false"
            }
        ).then(function (response) {

            expect(response.status).to.equal(200)
            //cy.log(response.body)
        })

        //Approach 2
        const requestBody = {

            "Email": "sathishsuresh@gmail.com",
            "Password": "Satz@984",
            "RememberMe": "false"
        }
        cy.request(
            {
                method: 'POST',
                url: 'https://demowebshop.tricentis.com/login',
                body: requestBody
            })
            .then(function (response) {
                expect(response.status).to.equal(200)
                //cy.log(response.body)
            })

    })

})

describe('Library API', function () {

    let bookId = null

    it('Add book', () => {
        const reqbody = {
            "name": "Learn Appium Automation with Java",
            "isbn": "bcd",
            "aisle": Math.random() * 999,
            "author": "John foer"
        }

        cy.request(
            'POST',
            'https://rahulshettyacademy.com/Library/Addbook.php',
            reqbody
        ).then(function (response) {

            expect(response.status).to.eq(200)
            bookId = response.body.ID
            cy.log(bookId)
        })


    })

    it('get Book by Id', () => {

        cy.log(bookId)
        cy.request(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php',
                qs: {
                    "ID": bookId
                }
            }
        ).then((response) => {
            expect(response.status).to.eq(200)
            
        })
    })

    it('Delete book', ()=> {
        cy.request(
            'Delete',
            'https://rahulshettyacademy.com/Library/DeleteBook.php',
            {
                "ID": bookId
            }
        ).then(function(response) {
            expect(response.status).to.eq(200)
            expect(response.body.msg).to.equal('book is successfully deleted')
        })
    })
    
    let id;
    it.only("Create a place", () => {
        
      cy.request({
       
        method: "POST",
        url: "https://rahulshettyacademy.com/maps/api/place/add/json",
        body: {
            location: {
                lat: -38.383494,
                lng: 33.427362
              },
              accuracy: 50,
              name: "Frontline house",
              phone_number: "(+91) 983 893 3937",
              address: "29, side layout, cohen 09",
              types: [
                "shoe park",
                "shop"
              ],
              website: "http://google.com",
              language: "French-IN"
        },
        qs: {
            "key" : "qaclick123"
        },
      })
      .its('status')    /// <reference types="@bahmutov/cy-api" />
      .should('eql', 200)
    });

})
