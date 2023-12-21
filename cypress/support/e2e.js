// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'cypress-mochawesome-reporter/register';
//import '@cypress/xpath'
require('@cypress/xpath');
import 'cypress-file-upload';
import 'cypress-downloadfile/lib/downloadFileCommand'
require('cy-verify-downloads').addCustomCommand();
import '@shelex/cypress-allure-plugin';
import 'cypress-axe'
import '@bahmutov/cy-api'
import '@cypress-audit/lighthouse/commands'
import "@cypress-audit/pa11y/commands";
import "qrcode-reader"

const addExtensionCommands = require('cypress-browser-extension-plugin/commands');
addExtensionCommands(Cypress);
require('@cypress/grep')()

//import "cypress-cucumber-attach-screenshots-to-failed-steps";

//Note : this code is get screenshot to failed step 
// afterEach(() => {
//     const screenshotsFolder = Cypress.config("screenshotsFolder");
//     if (window.cucumberJson?.generate) {
//         const testState = window.testState;
//         const stepResult =
//             testState.runTests[testState.currentScenario.name][testState.currentStep];
//         if (stepResult?.status === "failed") {
//             const screenshotFileName = `${testState.feature.name} -- ${testState.currentScenario.name} (failed).png`;
//             cy.readFile(
//                 `${screenshotsFolder}/${Cypress.spec.name}/${screenshotFileName}`,
//                 "base64"
//             ).then((imgData) => {
//                 stepResult.attachment = {
//                     data: imgData,
//                     media: { type: "image/png" },
//                     index: testState.currentStep,
//                     testCase: testState.formatTestCase(testState.currentScenario),
//                 };
//             });

//         }
//     }
// });