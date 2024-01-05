class ProductPage{

    getCheckout(){
        return cy.get('a[class="nav-link btn btn-primary"]')
    }

    getProductTitle(){
        return cy.get('h4.card-title a')
    }

    getProductAddToCart(){
        return cy.get('button[class="btn btn-info"]')
    }
}
export default ProductPage