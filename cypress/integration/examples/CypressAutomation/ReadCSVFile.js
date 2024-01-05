/// < reference types="Cypress" />

const neatCSV = require('neat-csv')
let productName

describe('Read csv file', function(){

    it('CSV parsing', async() => {

        cy.LoginAPI().then(function(){

            cy.visit('https://rahulshettyacademy.com/client', {
            
            onBeforeLoad: function(window){
                window.localStorage.setItem('token', Cypress.env('token'))
            }
            })

        })

        cy.get('.card-body b').eq(1).then(function(productNameElement){
            productName = productNameElement.text()

        })
        cy.get('.card-body button:last-of-type').eq(1).click()
        cy.get('[routerlink*="cart"]').click()
        cy.contains('Checkout').click()
        cy.get('[placeholder="Select Country"]').type('India')
        cy.get('.ta-results button span').each(($e1, index, $list) => {

            if($e1.text() == ' India'){
                cy.wrap($e1).click()
            }
        })

        cy.get('a.action__submit').click()
        cy.wait(2000)
        cy.get('button.btn-primary').eq(0).click()

        cy.readFile(Cypress.config('fileServerFolder')+ "/cypress/downloads/order-invoice_sathishsuresh984.csv")
        .then(async(text) => {

            const csv = await neatCSV(text)
            console.log(csv)

            const acturalProductCSV = csv[0]["Product Name"]
            expect(productName).to.equal(acturalProductCSV)
        })

       
        //short cut method to verify csv data

        const filePath = Cypress.config('fileServerFolder')+ "/cypress/downloads/order-invoice_sathishsuresh984.xlsx"

        cy.readFile(filePath).then(function(csvText){
            expect(csvText).to.include(productName)
        })
        

        })
    })
