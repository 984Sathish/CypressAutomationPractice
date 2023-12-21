class OrdersPage{

    getOrderMsg(){
        return cy.get('.title')
    }

    getOrderNum(){
        return cy.get('.details li')
    }

    getOrderDetails(){
        return cy.get('[href*="orderdetails"]')
    }

    getOrderId(){
        return cy.get('.order-number')
    }

}
export default OrdersPage