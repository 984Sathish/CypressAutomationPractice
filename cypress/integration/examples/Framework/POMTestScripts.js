import CartPage from "../PageObjects/CartPage"
import CheckOutPage from "../PageObjects/CheckOutPage"
import HomePage from "../PageObjects/HomePage"
import LoginPage from "../PageObjects/LoginPage"
import OrdersPage from "../PageObjects/OrdersPage"

describe('POM in demoWebShop Site', function () {

    before(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })


    it('Order Product', function () {

        const homePage = new HomePage()
        const loginPage = new LoginPage()
        const cartPage = new CartPage()
        const checkOutPage = new CheckOutPage()
        const ordersPage = new OrdersPage()

        cy.visit(Cypress.env('url'))

        //login
        loginPage.getLogin().click()
        loginPage.getEmail().type(this.data.email)
        loginPage.getPassword().type(this.data.password)
        loginPage.getSubmit().click()

        //verify logout is visible
        homePage.getLogout().should('be.visible')

        //hover and click phone
        homePage.getElectronic().eq(2).invoke('show')
        homePage.getCellPhone().eq(1).click({ force: true })

        //add prodcut to cart
        cy.selectProductToCart(this.data.productName) //reusables from command.js 

        //cart
        cartPage.getAddtoCart().eq(0).click()

        //checkout
        cartPage.getTermOfService().check().should('be.checked')
        cartPage.getCheckOut().click()

        //confim to order
        checkOutPage.getBillingSave().click()
        checkOutPage.getShippingSave().click()
        checkOutPage.getShipMethod().click()
        checkOutPage.getPayMethod().click()
        checkOutPage.getPayInfo().click()

        //verify product name
        checkOutPage.getProdName().should('have.text', 'Smartphone')
        checkOutPage.getConfirmOrderSave().click()

        //verify ordered message
        ordersPage.getOrderMsg().should('contain.text', 'Your order has been successfully processed')

        //get order number and verify
        ordersPage.getOrderNum().eq(0).then(function (orderElement) {
            let orderNumber = orderElement.text()
            orderNumber = orderNumber.split(':')[1].trim()
            cy.log("order number: " + orderNumber)
            ordersPage.getOrderDetails().click()


            //verify order number
            ordersPage.getOrderId().should('contain.text', orderNumber)
        })

    })

})