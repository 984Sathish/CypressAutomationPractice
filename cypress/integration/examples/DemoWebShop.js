/// <reference types="Cypress" />
describe('demoWebShop Site', function () {

  //Approach 1 - this 
  before(function () {
    cy.fixture('example').then((user) => {

      this.user = user
    })
  })
 

  it('order product', function () {

    cy.visit('https://demowebshop.tricentis.com/')

    //login
    cy.get('.ico-login').click()
    cy.get('#Email').type(this.user.email)
    cy.get('#Password').type(this.user.password)
    cy.get('[value="Log in"]').click()

    //verify logout is visible
    cy.get('[href*="logout"]').should('be.visible')

    //hover and click phone
    cy.get('ul.sublist').eq(2).invoke('show')
    cy.get('[href*="phones"]').eq(1).click({ force: true })

    //add prodcut to cart
    cy.get('.product-grid').find('.product-item').each(($el, index, $list) => {
      const actualProdName = this.user.productName
      const productName = $el.find('h2 a').text()
      if (productName == actualProdName) {
        cy.wrap($el).find('input').click()
      }
    })

    //cart
    cy.get('.cart-label').eq(0).click()

    //checkout
    cy.get('#termsofservice').check().should('be.checked')
    cy.get('#checkout').click()

    cy.get('[onclick="Billing.save()"]').click()
    cy.get('[onclick="Shipping.save()"]').click()
    cy.get('[onclick="ShippingMethod.save()"]').click()
    cy.get('[onclick="PaymentMethod.save()"]').click()
    cy.get('[onclick="PaymentInfo.save()"]').click()

    //verify product name
    cy.get('.product-name').should('have.text', 'Smartphone')

    cy.get('[onclick="ConfirmOrder.save()"]').click()

    //verify ordered message
    cy.get('.title').should('contain.text', 'Your order has been successfully processed')

    //get order number and verify
    cy.get('.details li').eq(0).then(function (orderElement) {
      let orderNumber = orderElement.text()
      orderNumber = orderNumber.split(':')[1].trim()
      cy.log("order number: " + orderNumber)
      cy.get('[href*="orderdetails"]').click()

      //verify order number
      cy.get('.order-number').should('contain.text', orderNumber)
    })


  })

})