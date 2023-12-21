class CartPage{

    getAddtoCart(){
        return cy.get('.cart-label')
    }

    getTermOfService(){
        return cy.get('#termsofservice')
    }

    getCheckOut(){
        return cy.get('#checkout')
    }
}
export default CartPage