describe('cypress grep', () => {

    /** Command line:
     *  "test:smoke": "cypress run --env grep=\"Smoke\"",
     * "test:smoke:regression": "cypress run --env grep=\"Smoke; Regression\"",
     * "test": "cypress run --env grepTags=\"Sprint\"",
     * "test:tag:sprintOrRegression": "cypress run --env grepTags=\"Sprint Regression \"",
     * "test:tag:sprintAndRegression": "cypress run --env grepTags=\"Sprint+Regression \"",
     * "test:tag:invertRegression": "cypress run --env grepTags=\"-Regression \" --spec \"cypress/integration/Group_TCS_2.js\""
     */

    it('Smoke Test', () => {
        expect(true).to.be.true
    });

    it('Regression Test', () => {
        expect(2).to.eql(2)
    });

    it('Sprint And Regression Test', { tags: ['Sprint', 'Regression'] }, () => {
        expect("Regression Test Suite").to.contains("Test")
    });

    it('Sprint Test', { tags: 'Sprint' }, () => {
        expect("Sprint Test Suite").to.contains("Test")
    });

    it('Regression Test with Tags', { tags: 'Regression' }, () => {
        expect("Regression Test Suite").to.contains("Test")
    });

});