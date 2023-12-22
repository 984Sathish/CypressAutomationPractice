// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('selectProductToCart', (actualProductName) => {
  cy.get('.product-grid').find('.product-item').each(($el, index, $list) => {
    const productName = $el.find('h2 a').text()
    if (productName == actualProductName) {
      cy.wrap($el).find('input').click()
    }
  })


})

//child command
Cypress.Commands.add('getSize', { prevSubject: true }, (element) => {
  return cy.wrap(element.length)
})

//dual command
Cypress.Commands.add('getText', {prevSubject: 'optional'}, (element) => {
  if(element){
    cy.wrap(element.text())
  }
  else{
    cy.wrap("NoSuchElement!!")
  }
})

//Parent command
Cypress.Commands.add('getTableValue', {prevSubject: false}, (row,col ) => {

  cy.get(`#table1 tr:nth-child(${row}) td:nth-child(${col})`).then(el => {
   cy.wrap(el.text())
  })
})
  //Login api
  Cypress.Commands.add("LoginAPI", ()=>{
      cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', 
      {"userEmail": "sathishsuresh984@gmail.com", "userPassword": "Satz@984"})
      .then(function(response){
          expect(response.status).to.equal(200)
          Cypress.env('token', response.body.token)
  
      })
  })

  //slect product
Cypress.Commands.add('selectProduct', (actualProductName) => { 
  cy.get('h4.card-title a').each(($el, index, $list) => {
       const productName = $el.text()
      if(productName == actualProductName){
          cy.get('button[class="btn btn-info"]').eq(index).click()
          }
      })
  })

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })