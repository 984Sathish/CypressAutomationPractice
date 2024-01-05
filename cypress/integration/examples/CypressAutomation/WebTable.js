describe('Handling web table', function(){

    it('webTable', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#product tbody tr td:nth-child(2)').each(($e1, index, $list) => {

            const courseName = $e1.text()
            if(courseName.includes('Python')){
                cy.get('#product tbody tr td:nth-child(2)').eq(index).next().then(function(price){

                    const coursePrice = price.text()
                    expect(coursePrice).to.equal('25')
                })
            }
        })
    })
})