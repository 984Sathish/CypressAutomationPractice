/// < reference types="Cypress" />

const neatCSV = require('neat-csv')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
let productName

describe('Read Excel file', function(){

    it('Excel parsing', async() => {

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

        //click to download Excel file 
        cy.get('button.btn-primary').contains('Excel').click()
   

        const filePath = Cypress.config('fileServerFolder')+ "/cypress/downloads/order-invoice_sathishsuresh984.xlsx"

        cy.task('excelToJsonConverter', filePath).then(function(result){
            
            cy.log(result)

            expect(productName).to.equal(result.data[1].B)  //verify product name from excel 

        })

        //short cut method to verify excel data

        cy.readFile(filePath).then(function(excelText){
            expect(excelText).to.include(productName)
        })

        // const result =  excelToJson({
        //     source: fs.readFileSync(filePath)  //fs.readFileSync return a Buffer
        // });

       
        
        

        })
    })
