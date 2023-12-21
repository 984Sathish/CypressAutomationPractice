class LoginPage{

    getLogin(){
        return cy.get('.ico-login')
    }
    getEmail(){
        return  cy.get('#Email')
    }

    getPassword(){
        return cy.get('#Password')
    }

    getSubmit(){
        return cy.get('[value="Log in"]')
    }

}
export default LoginPage