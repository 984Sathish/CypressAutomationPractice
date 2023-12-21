describe('Visual Testing with percy', function () {

    it.skip('Visual testing using percy', function () {

        //set PERCY_TOKEN=web_8431a1a064bebab0654a06223403eeba66b11cd083e29de7c97f7d7621baa438
        // npm percy exec -- cypress run
        cy.visit('https://demowebshop.tricentis.com/')
        cy.get('[alt="Tricentis Demo Web Shop"]').percySnapshot()  //Note: percy is not working!   
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


    it('Compare two files', function () {
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


})