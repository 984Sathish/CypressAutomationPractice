describe('Read from Excel file', function () {

    it('Login with excel data', function () {
        const excelFilePath = "C:/Users/sathish.suresh/CypressAutomationPractice/Book1.xlsx"
        const sheetName = "Sheet1"
        cy.task('generateJSONFromExcel', { excelFilePath, sheetName }).then(
            (user) => {
                cy.log(user[0].username)
                cy.log(user[0].password)
                
                cy.visit('https://demowebshop.tricentis.com/')
                cy.get('.ico-login').click()
                cy.get('#Email').type(user[0].username)    //get username from excel
                cy.get('#Password').type(user[0].password) //get password frome excel
                cy.get('[value="Log in"]').click()
            }
        )
    })
})