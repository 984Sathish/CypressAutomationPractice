describe('Handling dropdown elements', function(){

    it('Static dropdown', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
         //handle static dropdown
         cy.get('#dropdown-class-example').select('Option1').should('have.value', 'option1')
    })

    it('Dynamic dropdown', function(){

            cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
           //dynamic dropdown
           cy.get('#autocomplete').type('ind')
 
           cy.get('.ui-menu-item div').each(($el, index, $list) => {
               if($el.text() == 'India'){
                   cy.wrap($el).click()
               }
           })
    })
})
