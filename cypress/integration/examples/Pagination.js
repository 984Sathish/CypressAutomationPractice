describe('Pagination suite', function () {

    it('Pagination test', function () {
        cy.visit('https://letcode.in/advancedtable')
        //findItem() - call
        findItem('University of Sheffield')  //Royal College of Music, University of London

    })

    //findItem() - declaration
    function findItem(collegeName) {
        let length

        //get length of table
        cy.get('a[class="paginate_button "]').last().then(ele => {
            length = ele.text()

        }).then(() => {
            cy.log('Length = ' + length)
        })
        //call - findValue()
        findValue(1)

        //declaration - findValue()
        function findValue(value) {

            let found = false
            //verify length
            if (value > length) {
                return false
            }
            else {
                //click by number 1, 2, ...10
                cy.xpath(`//span /a[contains(@class, 'paginate_button') and text()='${value}']`).click()

                //get college name and verify
                cy.get('tbody tr td:nth-child(2)').each((el) => {
                    const text = el.text()
                    cy.log(text)
                    if (text == collegeName) {
                        found = true
                        return false
                    }
                }).then(() => {
                    //Recursive function(method call by method itself)
                    if (!found) {
                        findValue(++value)
                    }
                })
            }

        }

    }
})