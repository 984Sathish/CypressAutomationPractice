/// <reference types="Cypress" />

import 'cypress-iframe'
//import 'cypress-drag-drop'
import '@4tw/cypress-drag-drop'


describe('Cypress Automation Basic', function () {

    it('Frame', function () {

        //Approach 1 - using frameloaded 
        cy.visit('https://commitquality.com/practice-iframe')
        cy.frameLoaded('[data-testid="iframe"]')
        cy.iframe().find('[placeholder="Filter by product name"]').type('DemoProduct')

        //Approach 2 - javascript way
        cy.get('[title="Products"]').within(fr => {
            const [myframe] = fr.get()
            const text = myframe.contentDocument.body.getElementsByTagName('th')[0].textContent
            cy.log(text)
        })

        //Approach 3 - Jquery way
        cy.visit('https://the-internet.herokuapp.com/iframe')
        cy.origin('https://the-internet.herokuapp.com/iframe', () => {
            cy.get('#mce_0_ifr').within(fr => {
                const element = fr.contents().find('#tinymce')
                cy.wrap(element).clear().type('Hi, Entered').should('have.text', 'Hi, Entered')

            })
        })

        //Nested frame - javascript way
        cy.visit('https://the-internet.herokuapp.com/nested_frames')
        cy.origin('https://the-internet.herokuapp.com', () => {
            cy.get('[name="frame-top"]').within(fr => {
                const [frameTop] = fr.get()
                //inside 1st frame
                const text = frameTop.contentDocument.body
                    //get 2nd frame
                    .getElementsByTagName('frame')[1]
                    //inside 2nd frame
                    .contentDocument.body.querySelector('#content').textContent
                cy.log(text)
            })
        })

    })

    it('Window Handling', function () {

        // Approach 1
        cy.visit('https://letcode.in/windows')
        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'https://letcode.in/test'
            }).as('popup')
        })

        cy.get('#home').click()
        cy.get('h1.title').should('have.text', ' Practice and become pro in test automation')


        //Approach 2 - not working 
        // cy.visit('https://demo.automationtesting.in/Windows.html')
        // cy.get('[href="#Seperate"]').click()

        // cy.window().then(win => {
        //     const stub = cy.stub(win, 'open').as('windowOpen')
        // })
        // cy.get('[onclick="newwindow()"]').click()


        // cy.get('@windowOpen').should('be.calledWith', 'http://www.selenium.dev')

        //getting error because of some origin changes.
        // cy.window().then(win => {
        //     win.location.href = 'http://www.selenium.dev' 

        // })
    })



    it('Alert', function () {
        cy.visit('https://letcode.in/alert')
        cy.get('#accept').click()

        //simple alert
        cy.on('window:alert', (alertMsg) => {
            expect(alertMsg).to.equal('Hey! Welcome to LetCode')
            cy.log(alertMsg)
        })

        //confirm alert
        cy.get('#confirm').click()
        cy.on('window:confirm', (alertMsg) => {
            expect(alertMsg).to.equal('Are you happy with LetCode?')
            cy.log(alertMsg)
        })

        //cancel confirm alert
        cy.get('#confirm').click()
        cy.on('window:confirm', () => false)

        //promnt alert
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Sathish')
            cy.get('#prompt').click()
        })
        cy.get('#myName').should('have.text', 'Your name is: Sathish')
    })

    it('single select dropdown', () => {
        cy.visit('https://letcode.in/dropdowns')

        //select by text
        const dropdown = cy.get('#fruits').as('fruits')
        dropdown.select('Orange').should('have.value', '2')
        cy.contains('You have selected Orange').should('be.visible')
        //cy.get('@fruits').invoke('text').should('eq','Orange')
        cy.get('@fruits').invoke('val').should('eq', '2')

        //select by value
        cy.get('#superheros').as('heros')
            .select('aq').invoke('val').should('deep.equal', ['aq'])
        cy.contains('You have selected Aquaman').should('be.visible')
        //select by index
        cy.get('#lang').select(2).should('have.value', 'py')
    })

    //Note: In DOM we have style="display: none; -> use {force:true}
    it('Multi select dropdown', () => {
        cy.visit('https://admirhodzic.github.io/multiselect-dropdown/demo.html')

        //multi select by text
        cy.get('#field2').select(['Audi', 'Lexus'], { force: true }).invoke('val').should('deep.equal', ['Audi', 'Lexus'])

        //multi slect by value
        cy.get('#field1').select(['1', '5'], { force: true }).invoke('val').should('deep.equal', ['1', '5'])

    })

    it('drag and drop using trigger', () => {

        const dataTransfer = new DataTransfer()
        cy.visit('https://letcode.in/dropable')
        cy.get('#draggable').trigger('dragstart', { dataTransfer })

        cy.get('#droppable').trigger('drop', { dataTransfer })

    })

    //using this code to install 'npm i cypress-drag-drop' (or) '@4tw/cypress-drag-drop'
    it('drag and drop using "drag method" with source & target', () => {
        cy.visit('https://letcode.in/dropable')
        cy.get('#draggable').drag('#droppable', {
            source: { x: 200, y: 200 },
            target: { position: 'right' },
            force: true
        })

    })

    it('checkbox check & uncheck', () => {

        cy.visit('https://commitquality.com/practice-general-components')

        //check
        cy.get('[name="checkbox1"]').check().should('be.checked')
        cy.get('[name="checkbox2"]').check().should('be.checked')

        //uncheck
        cy.get('[name="checkbox1"]').uncheck().should('not.be.checked')

    })

    it('check the checkbox by using value', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('[type="checkbox"]').check('option2')
    })

    it('screenshot', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //element screenshot
        cy.screenshot('PracticePage')
        //page screenshot
        cy.get('[placeholder="Type to Select Countries"]').screenshot('CountryField')
    })

    it('Mouse over', function () {

        cy.visit('https://demowebshop.tricentis.com/')

        cy.get('.top-menu [href="/desktops"]').should('not.be.visible')
        cy.get('.top-menu [href*="computers"]').trigger('mouseover')
        cy.get('.top-menu [href="/desktops"]').should('be.visible')
    })

    it('Right click', function () {

        //Approach1 - trigger()
        cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html')
        cy.get('.context-menu-icon-paste').should('not.be.visible')
        cy.contains('right click me').trigger('contextmenu')
        cy.get('.context-menu-icon-paste').should('be.visible')

        //Approach2 - rightclick()
        cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html')
        cy.get('.context-menu-icon-paste').should('not.be.visible')
        cy.contains('right click me').rightclick()
        cy.get('.context-menu-icon-paste').should('be.visible')

    })

    it.skip('double click', function () { //fail due to site 

        //Approach1 - trigger()
        cy.visit('https://nxtgenaiacademy.com/mouseevent/')
        cy.get('#dblclick').trigger('dblclick')
        cy.get('#demo').should('have.text', 'Double Click Action is Performed')

        //Approach2 - dbclick()
        cy.get('#dblclick').dblclick()
        cy.get('#demo').should('have.text', 'Double Click Action is Performed')

    })

    it('scrolling', function () {
        cy.visit('https://www.amazon.in/')

        //Approach 1 - scrollIntoView - duration
        cy.get('#navBackToTop').scrollIntoView({ duration: 5000 })

        //Approach 2 - scrollIntoView - easing
        cy.get('#navBackToTop').scrollIntoView({ easing: 'linear' })

        //Approach 3 - scrollIntoView - should
        cy.get('#navBackToTop').scrollIntoView().should('be.visible')
    })


    it('xpath plugin', function () {

        cy.visit('https://demowebshop.tricentis.com/')
        cy.xpath('//a[text()="Log in"]').click()
    })

    it('verify Attribute', function () {

        cy.visit('https://commitquality.com/practice-general-components')
        cy.get('[data-testid="link-same-tab"]').should('have.attr', 'href', 'https://www.youtube.com/@commitquality')
    })

    it('Slider', function () {

        //Approach 1
        cy.visit('https://mui.com/material-ui/react-slider/')

        cy.xpath('(//span[@class="MuiSlider-track css-1t2bqnt"])[1]')
            .invoke('attr', 'style', 'left: 0%; width: 78%;')

        cy.xpath('(//span[contains(@class, "MuiSlider-thumb")])[1]')
            .invoke('attr', 'style', 'left: 78%;')

        cy.xpath('(//span[contains(@class, "MuiSlider-thumb")])[1] /input')
            .invoke('attr', 'aria-valuenow', '78')
            .invoke('attr', 'value', '78')

        cy.xpath('(//span[contains(@class, "MuiSlider-thumb")])[1] /input').should('have.value', '78')

        //Approach 2
        cy.visit('https://testautomationpractice.blogspot.com/')

        cy.origin('https://testautomationpractice.blogspot.com', () => {
            cy.get('#slider span').invoke('attr', 'style', 'left: 45%;')
        })

    })

    it('Assertion', function () {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        //implicit -> use should
        cy.url().should('include', 'demo.orangehrmlive.com')
            .should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            .should('contain', 'orangehrmlive')

        //implicit -> use should, and( instead of using multiple should we used 'and' )
        cy.url().should('include', 'demo.orangehrmlive.com')
            .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            .and('contain', 'orangehrmlive')

        //explicit:
        cy.get('[class*="login-title"]').then((element) => {

            //1.BDD style - expect
            const text = element.text()
            expect(text).to.equal('Login')
            expect(text).not.equal('login')

            //2.TDD style - assert
            assert.equal(text, 'Login')
            assert.notEqual(text, 'login')
        })
    })

    it('File uploading', () => {

        //file upload
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#file-upload').attachFile('code.txt')
        cy.get('#file-submit').click()
        cy.get('h3').should('be.visible')
        cy.get('h3').should('have.text', 'File Uploaded!')

        //file upload with rename 
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#file-upload').attachFile({ filePath: 'code.txt', fileName: 'fileName' })
        cy.get('#file-submit').click()
        cy.get('h3').should('be.visible')
        cy.get('h3').should('have.text', 'File Uploaded!')

        //file upload by drag and drop
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#drag-drop-upload').attachFile('code.txt', { subjectType: 'drag-n-drop' })
        cy.get('#drag-drop-upload .dz-filename span').should('have.text', 'code.txt')
    })

    it('upload multiple file', function () {
        //multiple file upload
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')
        cy.get('#filesToUpload').attachFile(['file1.pdf', 'file2.pdf'])
        cy.get('#fileList li').should('not.contain.text', 'No Files Selected')
    })

    it('Shadow root', () => {
        cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm')

        //Approach 1
        cy.get('.smart-browse-input', { includeShadowDom: true }).attachFile('file1.pdf')
        cy.get('.smart-item-name', { includeShadowDom: true }).should('have.text', 'file1.pdf')

        //Approach 2
        cy.reload()
        cy.get('.smart-ui-component').shadow().find('[smart-id="browseInput"]').attachFile('file1.pdf')
        cy.get('.smart-ui-component').shadow().find('.smart-item-name').should('have.text', 'file1.pdf')

        //Approach 3
        cy.get('.smart-ui-component').should(e => {
            const [dom] = e.get() //return dom element as array
            expect(dom.shadowRoot.querySelector('.smart-item-name').textContent).to.eql('file1.pdf')

        })
    })

    it('Navigation', () => {

        cy.visit('https://demo.opencart.com/')
        cy.title().should('eq', 'Your Store')
        cy.xpath('//a[text()="Cameras"]').click()
        cy.get('h2').should('have.text', 'Cameras')

        //go back
        cy.go('back')
        cy.title().should('eq', 'Your Store')

        //go forward
        cy.go('forward')
        cy.get('h2').should('have.text', 'Cameras')

        //go back(-1)
        cy.go(-1)
        cy.title().should('eq', 'Your Store')

        //go forward(1)
        cy.go(1)
        cy.get('h2').should('have.text', 'Cameras')

        cy.reload()

    })

    it('Simple Web table', () => {

        cy.visit('https://letcode.in/table')

        //Table 1
        //get row
        cy.get('#shopping tbody tr').each(($row, index, $rows) => {
            cy.wrap($row).within(() => {
                //get coloum
                cy.get('td:nth-child(2)').each(($col, index, $cols) => {
                    cy.log($col.text())
                })
            })
        })

        //Table 2
        cy.get('#simpletable tbody tr').each(($row, index, $rows) => {
            cy.wrap($row).within(() => {
                cy.get('td:nth-child(2)').then(function (element) {
                    if (element.text().match('Raj')) {
                        cy.get('td:nth-child(4) input').check().should('be.checked')
                    }
                })
            })
        })

    })

    it('Web Table with Pagination', function () {

        cy.visit('https://letcode.in/advancedtable')
        let totalpages
        cy.get('#advancedtable_info').then((ele) => {
            let mytext = ele.text()
            totalpages = mytext.substring(mytext.indexOf('f') + 1, mytext.indexOf('entries') - 1)
            cy.log(totalpages)

            totalpages = 5
            let myWebsite
            for (let i = 1; i <= totalpages; i++) {

                cy.log('Active page is==== ' + i)
                cy.get('span a[class*="paginate_button"]:nth-child(' + i + ')').click()

                cy.get('#advancedtable tbody tr').each(($row, index, $rows) => {

                    cy.wrap($row).within(() => {
                        cy.get('td:nth-child(4)').then((e) => {
                            myWebsite = e.text()
                            if (myWebsite == 'https://www.northampton.ac.uk/') {
                                cy.log('***Website: ' + myWebsite)
                            }
                        })

                    })
                })
            }
        })
    })

    it('Web Table with Pagination Approach 2', function () {

        cy.visit('https://letcode.in/advancedtable')
        const next = cy.get('#advancedtable_next')
        let myWebsite
        let flag = false
        let count = 1
        if (!flag) {

            cy.get('#advancedtable tbody tr').each(($row, index, $rows) => {


                cy.wrap($row).then(() => {
                    count++
                    cy.get('td:nth-child(4)').then((e) => {
                        myWebsite = e.text()

                        if (myWebsite == 'https://www.northampton.ac.uk/') {
                            cy.log('***Website: ' + myWebsite)
                            flag = true
                        }

                        else {
                            cy.log(count)
                            if (count == 5) {
                                next.click()
                                count = 1
                            }
                        }
                    })

                })
            })
        }


    })

    it('dropdown without select', function () {

        cy.visit('https://www.leafground.com/select.xhtml')
        cy.get('[aria-haspopup="listbox"]').eq(0).click()
        cy.get('[data-label="India"]').click()
        cy.get('[class*="ui-inputfield"]').eq(0).should('have.text', 'India')

    })

    it.skip('download file and read file', () => {
        cy.visit('http://autopract.com/selenium/download.html')

        //using readFile to verify downloaded file
        cy.get('.docfile').click()
        cy.readFile('cypress/downloads/32mb.docx.crdownload', { timeout: 6000 })

        //using verifyDownload to verify downloaded file
        cy.get('.docfile').click()
        cy.verifyDownload('32mb.docx.crdownload', { timeout: 6000 })

        //download file 
        cy.downloadFile('http://autopract.com/selenium/image.jpeg', 'cypress/fixtures', 'photo.jpeg')
        cy.readFile('cypress/fixtures/photo.jpeg')
    })

    it('Alias in cypress', () => {
        cy.visit('https://demowebshop.tricentis.com/login')

        //as alias with element
        cy.get('#Email').as('EmailFld')
        cy.get('#Password').as('PasswordFld')
        cy.get('[class*="login-button"]').as('LoginBtn')

        //call alias name
        cy.get('@EmailFld').type('Sathishsuresh@gmail.com')
        cy.get('@PasswordFld').type('Satz@984')
        cy.get('@LoginBtn').click()

    })

    it('Viewport', function () {
        //view - default
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.wait(5000)

        //viewport - samsung mobile in portrait
        cy.viewport('samsung-note9', 'portrait')
        cy.wait(5000)

        //view - iphone mobile in landscape
        cy.viewport('iphone-3', 'landscape')
        cy.wait(5000)
    })

    it('Cookies', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')

        //set cookie
        cy.setCookie('Automation', "CypressTool")
        cy.setCookie('Language', 'Javascript')
        //get cookie
        cy.getCookie('Automation')
        cy.getCookie('Language')

        //clear cookie
        cy.clearCookie('Automation')
    })

    it('click multiple element', () => {
        cy.visit('https://rahulshettyacademy.com/client')
        cy.get('input').click({ multiple: true, force: true })
    })

    it('Limit scope', () => {
        cy.visit('https://rahulshettyacademy.com/client')

        //In input tag - we have 3 elements
        cy.get('input').click({ multiple: true, force: true })

        //using 'within' we have filter the element in [class = "form-group"] with input tag
        cy.get('[class = "form-group"]').within(ele => {
            cy.get('input').click()
        })
    })

    it('get children, parent and siblings element', function () {

        cy.visit('https://demowebshop.tricentis.com/')

        //children 
        cy.get('.rightside-3')
            .children() //goto child element
            .last().find('input').click({ multiple: true })
        cy.get('.poll-vote-error').should('have.text', 'Only registered users can vote.')

        //parent
        cy.get('#newsletter-subscribe-button')
            .parent() //goto parent element
            .prev()  //goto preview parent
            .find('input').type('123@gmail.com')
            .should('have.value', '123@gmail.com')

        //siblings
        cy.get('#pollanswers-1').siblings().contains('Excellent')
    })

    it('each() method - handle multiple element', () => {
        cy.visit('https://demowebshop.tricentis.com/')
        cy.get('.answer').find('label').each(rBtn => {
            cy.log(rBtn.text())
        })
    })

    it('contains with selector and text', () => {
        cy.visit('https://demowebshop.tricentis.com/')

        //contains with 'span' tag with 'shopping cart' text
        cy.contains('span', 'Shopping cart').click()
        cy.title().should('include', 'Shopping Cart')
    })

    it('write file', () => {
        //write 
        cy.writeFile('Sample.txt', 'Hello world\n')
        //overwrite
        cy.writeFile('Sample.txt', 'line 2', { flag: "a+" })
        //readfile
        cy.readFile('Sample.txt').should('include', 'Hello world')
    })

    it('POM using JsonFile', function () {
        const login = require('../examples/LoginElement')
        cy.visit('https://demowebshop.tricentis.com/')
        cy.get(login.btnLogin).click()
        cy.get(login.fldEmail).type("sathishsuresh@gmail.com")
        cy.get(login.fldPass).type('Satz@984')
        cy.get(login.btnSubmit).click()
    })

    it.skip('Testdata from command line', () => {
        //commandline : npx cypress run --env email=sathishsuresh@gmail.com, password=Satz@984 cypress\integration\examples\CypressBasic.js
        //get env variable
        let user = {
            email: Cypress.env('email'),
            password: Cypress.env('password'),
        }

        cy.visit('https://demowebshop.tricentis.com/')

        //login
        cy.get('.ico-login').click()
        cy.get('#Email').type(user.email)
        cy.get('#Password').type('Satz@984')  //getting error in special character using in user.password
        cy.get('[value="Log in"]').click()
    })

    it('Extract text from image', function () {
        cy.downloadFile(
            'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            'cypress/fixtures',
            'image.jpg'
        )
            .then(() => {
                cy.task('getImageText', {
                    fileName: "cypress/fixtures/image.jpg",
                    lang: "eng",
                    logger: false
                })
                    .then(text => {
                        expect(text).to.contains('sidebar')
                        cy.log(text)
                    })
            })
    })


    it('Compare twofiles', function () {
        cy.downloadFile(
            'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            'cypress/fixtures',
            'image.jpg'
        )
            .then(() => {
                cy.task("compareImages", {
                    fileName1: "cypress/fixtures/image.jpg",
                    fileName2: "cypress/fixtures/Expected_image.jpg" //same
                })
                    .then(isMathing => {
                        expect(isMathing).to.be.true
                    })
            })
            .then(() => {
                cy.task("compareImages", {
                    fileName1: "cypress/fixtures/image.jpg",
                    fileName2: "cypress/fixtures/Different_Image.png" //different image
                })
                    .then(isMathing => {
                        expect(isMathing).to.be.false
                    })
            })
    })

    it('Wrap command', () => {


        //1.wrap on variable 
        let name = "sathish suresh"

        //name.should('eq', 'sathish suresh')  getting error like: name.should is not function
        cy.wrap(name).should('eq', 'sathish suresh')

        //2.wrap on jquery obj
        cy.visit('https://demowebshop.tricentis.com/login')
        cy.get('#Email').then(fldEmail => {
            cy.wrap(fldEmail).type('sathishsuresh984@gamil.com')
            cy.wrap(fldEmail).should('have.value', 'sathishsuresh984@gamil.com')
        })

    })

    it('QR code test', () => {
        cy.task('readQRCode', 'C:/Users/sathish.suresh/CypressAutomationPractice/cypress/fixtures/QRcode.png')
            .then(res => {
                cy.log(res.trim())
                expect(res.trim()).to.contain('sathishsuresh984')
            })

        cy.task('readQRCode', 'C:/Users/sathish.suresh/CypressAutomationPractice/cypress/fixtures/Qpic.png')
            .then(res => {
                cy.log(res.trim())
                expect(res.trim()).to.contain("QA BOX LET'S TEST")
            })  
    })



})