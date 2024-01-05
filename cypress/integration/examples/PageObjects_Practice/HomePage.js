class HomePage{

    getName(){
        return cy.get('div.form-group [name="name"]')
    }
    
    getEmail(){
        return cy.get('[name="email"]')
    }

    getPassword(){
        return cy.get('#exampleInputPassword1')
    }

    getGender(){
        return cy.get('select')
    }

    getShop(){
        return cy.get(':nth-child(2) > .nav-link')
    }
}
export default HomePage