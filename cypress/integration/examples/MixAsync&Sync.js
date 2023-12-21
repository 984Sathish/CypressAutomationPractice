describe('mix async and synce', function(){

    
    it.only('fetch text', function(){

        //1
        cy.visit('https://demowebshop.tricentis.com/')
        let arr = []
        cy.get('a').each((el) => {
            arr.push(el.text())
        }).then(() => {
            //print in console log
            console.log(`Anchor tag count - ${arr.length}`)
           console.log(`Anchor tag text - ${arr.join(", ")}`)
        })

        //2
        let arr2 = []
        cy.get("a")
            .then((els) => {
            for (let i = 0; i < els.length; i++) {
                arr2.push(Cypress.$(els[i]).text())   
            }
            return arr
        })
        .then((myarr) => {
            console.log(`Anchor tag count - ${myarr.length}`)
            console.log(`Anchor tag text - ${myarr.join(", ")}`)
        })
       
    })
})