let { AfterAll, BeforeAll, After, Before } = require("@cucumber/cucumber");
const utility = require("../UI_handler/utility");
const dataprovider = require("../UI_handler/data_provider");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(5 * 60000);

BeforeAll(async function () {
  console.log("Test Started");
});

Before({ tags: "@first" }, async function () {
  await utility.browserType("browser");
  await utility.launchAppUrl(dataprovider.loginData.appUrl);
});

Before((scenario) => {
  console.log(
    "\n----------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    ` SCENARIO NAME-> ${scenario.pickle.name} \n SCENARIO URI-> ${scenario.pickle.uri}`
  );
  console.log(
    "----------------------------------------------------------------------------------------------------------------"
  );
});

After(async function (testCase) {
  var attach = this.attach;
  if (testCase.result.status === "FAILED")
    return driver.takeScreenshot().then(function (png) {
      var decodedImage = new Buffer.from(png, "base64");
      return attach(decodedImage, "image/png");
    });
});

After({ tags: "@last" }, function (scenario) {
  console.log(
    "\n*************************************************************************************"
  );
  console.log(`| ${scenario.pickle.uri} | -> Test Completed`);
  console.log(
    "*************************************************************************************"
  );
});

AfterAll(async function () {
  await driver.quit();
  console.log("Test Completed.");
});
