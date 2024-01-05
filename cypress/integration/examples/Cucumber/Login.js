class Login {
    constructor() {
        if (Login._instance) {
            return Login._instance
        }
        Login._instance = this;
        this.email = "input#Email";
        this.password = "input#Password";
        this.submit = "[value='Log in']"
        this.LogoBtn = "[alt='Tricentis Demo Web Shop']"
    }

    get email() {
        return cy.get(this.email);
    }

    get password() {
        return cy.get(this.password);
    }

    get submitBtn() {
        return cy.get(this.submit);
    }

    get logoBtn(){
        return cy.get(this.LogoBtn)
    }
}

const loginObj = new Login()
export default loginObj