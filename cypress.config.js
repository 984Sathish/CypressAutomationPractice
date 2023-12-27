const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const { verifyDownloadTasks } = require('cy-verify-downloads');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const xlsx = require('xlsx')
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");
const tesseract = require('tesseract.js')
const Jimp = require("jimp");
const fs = require('fs')
const path = require("path")
const extensionloader = require('cypress-browser-extension-plugin/loader');
var QRReader = require('qrcode-reader/');
const excelToJson = require('convert-excel-to-json')

module.exports = defineConfig({

  projectId: 'atpvqq',
  chromeWebSecurity: false,
  video: true,
  screenshotOnRunFailure: true,
  experimentalStudio: true,
  defaultCommandTimeout : 15000, //15 sec


  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'HTML Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
  },

  env: {
    url: "https://rahulshettyacademy.com",
    appURL : "https://opensource-demo.orangehrmlive.com"
  },

  retries: 0, //runMode: 1, openMode : 1

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //read QR code
      const readQRCode = async (filePath) => {
        // const fp = path.join(__dirname, filePath)
        const fp = filePath
        try {
          if (fs.existsSync(fp)) {
            const img = await Jimp.read(fs.readFileSync(fp));
            const qr = new QRReader();
            const value = await new Promise((resolve, reject) => {
              qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
              qr.decode(img.bitmap);
            });
            return value.result;
          }
        } catch (error) {
          return error.message
        }
      }

      //QR code
      on('task', { readQRCode: readQRCode });

      //mochawesome reporter - Html report
      require('cypress-mochawesome-reporter/plugin')(on);

      //download file
      on('task', { downloadFile })

      //verify download
      on('task', verifyDownloadTasks)

      //allure report
      module.exports = (on, config) => {
        allureWriter(on, config);
        return config;
      };

      //before launch - lighthouse
      on("before:browser:launch", (browser, launchOptions) => {
        prepareAudit(launchOptions);
      });

      //lighthouse
      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y(console.log.bind(console))
      });

      //excel 
      on('task', {
        generateJSONFromExcel: generateJSONFromExcel,
      })

      //get image text - function
      const getImageText = async (obj) => {
        let { fileName, lang, logger } = obj
        let recognizeResult = null
        if (fs.existsSync(fileName)) {
          if (logger) {
            const myLogger = {
              logger: m => console.log(m)
            }
            recognizeResult = await tesseract.recognize(fileName, lang, myLogger)
          }
          else {
            recognizeResult = await tesseract.recognize(fileName, lang)
          }
          if (recognizeResult) {
            return recognizeResult.data.text
          }
        }
      }

      //compare image - function
      const compareImages = async (obj) => {
        const { fileName1, fileName2 } = obj
        const example1 = await Jimp.read(fileName1)
        const example2 = await Jimp.read(fileName2)
        const example1Hash = example1.hash()
        const example2Hash = example2.hash()
        const distance = Jimp.distance(example1, example2)
        const diff = Jimp.diff(example1, example2)

        if (example1Hash !== example2Hash || distance > 0.15 || diff > 0.15) {
          return false
        } else {
          return true
        }
      }

      //visual testing
      on('task', {
        getImageText: getImageText,
        compareImages: compareImages
      })

      //cucumber
      module.exports = (on, config) => {
        on('file:preprocessor', cucumber())
      }

      //load extension - way 1
      module.exports = (on, config) => {
        require('@cypress/grep/src/plugin')(config)  //grep
        on('before:browser:launch', (browser, launchOptions) => {
          launchOptions.extensions.push(path.resolve(__dirname, "../../Ignore-X-Frame-headers"))
        })
      }

      //load extension - way 2
      // module.exports = (on) => {
      //   on('before:browser:launch', extensionloader.load('C:/Users/sathish.suresh/CypressAutomationPractice/Ignore-X-Frame-headers'));
      // }

      //excel - function
      function generateJSONFromExcel(agrs) {
        const wb = xlsx.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
        const ws = wb.Sheets[agrs.sheetName];
        return xlsx.utils.sheet_to_json(ws, { raw: false });
      }

      //excel to json converter
      on('task', {
        excelToJsonConverter(filePath){
            const result =  excelToJson({
            source: fs.readFileSync(filePath)  //fs.readFileSync return a Buffer
        });
        return result;
        }
      })

    },
    specPattern: 'cypress/integration/examples/NewFramework/*.js'  //cypress/integration/examples/*.js
    //cucumber run -  **/*.feature  
  },
})
