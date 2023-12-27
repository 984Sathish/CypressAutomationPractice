import { faker } from '@faker-js/faker';
import FakerObject from '../Utils/FakerObject'

describe('OrangeHRM Test Suite', function () {

    const excelFilePath = "C:/Users/sathish.suresh/Documents/CypressAutomation/dataFile.xlsx"
    const sheetName = 'CreateUser'

    const loginPage = require('../NewPageObjects/LoginPage.json')
    const dashboardPage = require('../NewPageObjects/Dashboard.json')
    const adminPage = require('../NewPageObjects/AdminPage.json')
    const pimPage = require('../NewPageObjects/PIMPage.json')
    const leavePage = require('../NewPageObjects/LeavePage.json')

    const fk = new FakerObject()

    it('Create User, Employee, Add Employee Details and Assign Leave', function () {

        cy.task('generateJSONFromExcel', { excelFilePath, sheetName }).then(
            (data) => {

                //navigate url
                cy.visit(Cypress.env('appURL'))
                //cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/contactDetails/empNumber/113')

                //login 
                cy.get(loginPage.fldUser).type(data[0].Username)
                cy.get(loginPage.fldPass).type(data[0].Password)
                cy.get(loginPage.btnSubmit).click()

                //validate dashboard page
                cy.url().should('include', 'dashboard')

                //got to PIM 
                cy.get(dashboardPage.btnMenu).contains('PIM').click()

                cy.get(pimPage.btnAddEmp).contains('Add').click()

                const firstName = faker.person.firstName()
                const lastName = faker.person.lastName()

                cy.log("firstname - " + firstName)
                cy.log("lastname - " + lastName)

                cy.get(pimPage.fldfirstName).type(firstName)
                cy.get(pimPage.fldlastName).type(lastName)

                cy.get(pimPage.empId).last().then((id) => {
                    const empId = id.val()
                    cy.log(empId)
                    cy.writeFile('data.json', { id: empId })
                })

                //save employee information
                cy.get(pimPage.btnSave).click()

                //validate success message
                cy.get(pimPage.msgSuccess).should('be.visible')

                //go to admin page
                cy.get(dashboardPage.btnMenu).contains("Admin").click()

                //add user
                cy.get(adminPage.btnAdd).contains('Add').click()

                const role = fk.role
                const status = fk.status
                const username = faker.internet.userName()

                //fill user details
                cy.enterUserDetails(adminPage, role, status, firstName, lastName, username)

                //type password
                const password = faker.internet.password() + faker.number.int(100)
                cy.get(adminPage.fldPassword).first().type(password)

                //type confirm password
                cy.get(adminPage.fldPassword).last().type(password)

                //save user
                cy.get(adminPage.btnSave).click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')

                //wait for filter table
                cy.get(adminPage.filterTable).should('be.visible')

                //enter details
                cy.enterUserDetails(adminPage, role, status, firstName, lastName, username)

                //click on search btn
                cy.get(adminPage.btnSave).click()

                //verify user records
                cy.get(adminPage.userTable).should('have.length', 1)

                cy.get(dashboardPage.btnMenu).contains('PIM').click()

                //type employee name
                cy.get(pimPage.lblEmpTabs).contains('Employee Name').parent().next().find(pimPage.drpdwnEmp).type(firstName + " ", { timeout: 10000 })
                cy.get(pimPage.listUser).contains(lastName).click()

                //type employee id
                cy.readFile('data.json').then((data) => {
                    cy.get(pimPage.empId).last().type(data.id)
                })

                cy.writeFile('user.json',{firstName : firstName, lastName: lastName, username : username, password: password } )

                //search employee
                cy.get(pimPage.btnSave).click()

                //verify search result
                cy.get(pimPage.userTable).should('have.length', 1).click()

                //add nationality
                cy.get(pimPage.lblEmpTabs).contains('Nationality').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains('India').click()

                //add marital status
                cy.get(pimPage.lblEmpTabs).contains('Marital Status').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.maritalStatus).click()

                //add DOB
                let dob = faker.date.past().toISOString().toString().substring(0, 10)  //2023-03-06T13:45:10.671Z
                cy.get(pimPage.datePicker).last().type(dob)

                //select gender
                const gender = fk.gender
                cy.log(gender)
                cy.get(pimPage.radioBtn).contains(gender).click()

                //save personal details
                cy.get(pimPage.btnSave).first().click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')

                //add Blood Type
                cy.get(pimPage.lblEmpTabs).contains('Blood Type').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.bloodType).click()

                //save Blood details
                cy.get(pimPage.btnSave).last().click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')

                //go to edit contact details
                cy.get(pimPage.empTabs).contains('Contact Details').click()

                //add street 
                cy.get(pimPage.lblEmpTabs).contains('Street 1')
                    .parent().next().find(pimPage.empId).type(faker.address.streetAddress())

                //add city
                cy.get(pimPage.lblEmpTabs).contains('City')
                    .parent().next().find(pimPage.empId).type(faker.address.city())

                //add state
                cy.get(pimPage.lblEmpTabs).contains('State/Province')
                    .parent().next().find(pimPage.empId).type(faker.address.state())

                //slect country
                cy.get(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains('India').click()

                //add zipcode
                cy.get(pimPage.lblEmpTabs).contains('Zip/Postal Code').parent().next().find(pimPage.empId).type(faker.address.zipCode())

                //add mobile number
                cy.get(pimPage.lblEmpTabs).contains('Mobile').parent().next().find(pimPage.empId).type(faker.phone.number().replaceAll('x', '-').replaceAll('.', ''))

                //add email
                cy.get(pimPage.lblEmpTabs).contains('Work Email').parent().next().find(pimPage.empId).type(faker.internet.email())

                //save contact details
                cy.get(pimPage.btnSave).click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')

                // cy.get(pimPage.btnAddAttach).contains('Add').click()
                // const fileName = "code.txt"
                // cy.wait(5000)
                // cy.get('.oxd-file-input').attachFile(fileName,  { force: true })
                // cy.get(pimPage.fileName).should('have.text', fileName)
                // cy.get(pimPage.btnSave).last().click()

                //go to edit contact details
                cy.get(pimPage.empTabs).contains('Job').click()

                //add joining date
                cy.get(pimPage.datePicker).type(dob)

                //add job title
                cy.get(pimPage.lblEmpTabs).contains('Job Title').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.jobTitle).click()

                //add Job Category
                cy.get(pimPage.lblEmpTabs).contains('Job Category').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.jobCategory).click()

                //add Sub Unit
                cy.get(pimPage.lblEmpTabs).contains('Sub Unit').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.subUnit).click()

                //add Location
                cy.get(pimPage.lblEmpTabs).contains('Location').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.location).click()

                //add Employment Status
                cy.get(pimPage.lblEmpTabs).contains('Employment Status').parent().next().find(pimPage.drpdownWithOption).click()
                cy.get(pimPage.listUser).contains(fk.empStatus).click()

                //save contact details
                cy.get(pimPage.btnSave).click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')

                //got to PIM 
                cy.get(dashboardPage.btnMenu).contains('Leave').click()

                //click more option
                cy.get(leavePage.topOrderMenu).contains('More').click()

                //select Assign leave top order menu
                cy.get(leavePage.topOrderdrpdwnMenu).contains('Assign Leave').click()

                //type employee name
                cy.get(leavePage.lblOption).contains('Employee Name').parent().next().find(leavePage.drpdwnEmp).type(firstName + " ",)
                cy.get(leavePage.listUser).contains(lastName).click()

                //select leave type
                const leaveType = fk.leaveType
                cy.get(leavePage.lblOption).contains('Leave Type').parent().next().find(leavePage.drpdownWithOption).click()
                cy.get(leavePage.listUser).contains(leaveType).click()

                //get leave date
                const leaveDate = faker.date.future().toISOString().toString().substring(0, 10)  //2023-03-06T13:45:10.671Z

                //From date
                cy.get(leavePage.datePicker).first().type(leaveDate, { delay: 200 })
                //To date
                cy.get(leavePage.datePicker).last().dblclick()

                //select duration
                cy.get(leavePage.lblFixOption).contains('Duration').parent().next().find(leavePage.drpdownWithOption).click()
                cy.get(leavePage.listUser).contains(fk.leaveDuration).click()

                //assign leave
                cy.get(leavePage.btnSave).click()

                //click ok to dialog
                cy.get(leavePage.btnDialogOk).last().should('be.visible').click()

                //validate success message
                cy.get(adminPage.msgSuccess).should('be.visible')
            })
    })
})  