class CheckOutPage{

    getCheckOut(){
        return cy.get('button[class="btn btn-success"]')
    }

    getCountry(){
        return cy.get('#country')
    }

    getCountrySuggestion(){
        return cy.get('div.suggestions ul li a', {timeout: 10000})
    }

    getAgreeCheckBox(){
        return cy.get('#checkbox2')
    }

    getPurchase(){
        return cy.get('[value="Purchase"]')
    }

    getOrderSuccessMsg(){
        return cy.get('div.alert')
    }

    getPrice(){
        return cy.get('tr td:nth-child(4) strong')
    }
    
    getTotalAmount(){
        return cy.get('tr td:nth-child(5) strong')
    }
}

export default CheckOutPage