class HomePage {

    getLogout(){
        return cy.get('[href*="logout"]')
    }

    getElectronic(){
        return cy.get('ul.sublist')
    }

    getCellPhone(){
        return cy.get('[href*="phones"]')
    }

    getProduct(){
        return cy.get('.product-grid')
    }

}

export default HomePage