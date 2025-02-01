const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const pageFactory = require("../UI_handler/page_factory");
const dataprovider = require("../UI_handler/data_provider");

const browserType = async (type) => {
  switch (type) {
    case "headless":
      const screen = { width: 1920, height: 1080 };
      driver = new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(
          new chrome.Options().addArguments("--headless=new").windowSize(screen)
        )
        .build();
      break;
    case "browser":
      driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
      driver.manage().window().setRect({ width: 1920, height: 1080 });
      break;
  }
};

const launchAppUrl = async (App_Url) => {
  await driver.get(App_Url);
  console.log("Navigating to wise app login page...");
  await driver.manage().window().maximize();
};

const wiseLogin = async (mobileNumber) => {
  try {
    await driver
      .wait(
        until.elementLocated(pageFactory.commonLocators.continueWithMobile),
        5000
      )
      .click();
    await elementIsEnabled(
      pageFactory.commonLocators.getOtpButton,
      "get Otp Button is Present"
    );
    await errorHandling();
    await driver
      .wait(
        until.elementLocated(pageFactory.commonLocators.mobileNumberFeild),
        60000
      )
      .sendKeys(mobileNumber);
    await driver
      .wait(until.elementLocated(pageFactory.commonLocators.getOtpButton), 5000)
      .click();
    await elementIsDisabled(
      pageFactory.commonLocators.verifyButton,
      "Verify Button is disbaled state"
    );
    await enterOTP(driver);
    await driver
      .wait(until.elementLocated(pageFactory.commonLocators.verifyButton), 5000)
      .click();
  } catch (e) {
    await otpExpired();
  }
};

const otpExpired = async () => {
  let otpExpiredMessage;
  try {
    otpExpiredMessage = await driver.wait(
      until.elementLocated(pageFactory.commonLocators.okayButton),
      3000
    );
    await driver.wait(until.elementIsVisible(otpExpiredMessage), 3000);
  } catch (e) {
    otpExpiredMessage = null;
  }
  try {
    if (otpExpiredMessage) {
      console.log("got otpExpired message,Refreshing the Page");
      await driver.navigate().refresh();
      console.log("Page refreshed");
      console.log("logging again");
      await wiseLogin();
    }
  } catch (e) {
    throw new Error("error in scheduling session due to: " + e);
  }
};

const enterOTP = async (driver) => {
  let otp = dataprovider.loginData.otp;
  console.log("Entering OTP....");
  await driver.sleep(500);
  for (let i = 0; i < otp.length; i++) {
    let otpField = await driver.wait(
      until.elementLocated(
        By.xpath(`//input[@type='number'][@class='otp-field-box--${i}']`)
      ),
      5000
    );

    await otpField.sendKeys(otp[i]);

    console.log(`Entered ${otp[i]} in OTP box ${i + 1}`);
  }
};

const assertText = async (element, expectedValue, message) => {
  await driver.sleep(500);
  const elementText = await driver.wait(until.elementLocated(element), 30000);
  let elementToLocate;
  elementToLocate = await driver
    .wait(until.elementTextContains(elementText, expectedValue), 6000)
    .getText();
  console.log(
    "|Actual value: " +
      elementToLocate +
      "|" +
      "|Expected value: " +
      expectedValue +
      "|"
  );
  assert.strictEqual(elementToLocate, expectedValue);
  console.log(message);
};
const elementIsDisabled = async (element, message) => {
  const elementToLocate = await driver.wait(
    until.elementLocated(element),
    30000
  );
  await driver.wait(until.elementIsDisabled(elementToLocate), 30000);
  assert.strictEqual(await elementToLocate.isEnabled(), false);
  console.log(message);
};

const elementIsEnabled = async (element, message) => {
  const elementToLocate = await driver.wait(
    until.elementLocated(element),
    30000
  );
  await driver.wait(until.elementIsEnabled(elementToLocate), 30000);
  assert.strictEqual(await elementToLocate.isEnabled(), true);
  console.log(message);
};

const errorHandling = async () => {
  await driver
    .wait(until.elementLocated(pageFactory.commonLocators.getOtpButton), 5000)
    .click();
  console.log(" Get OTP Button is clicked without entering mobile number");
  await assertText(
    pageFactory.assertionLocators.alertModal,
    dataprovider.assertionData.alertMessage
  );
  await driver.sleep(500);
  await driver
    .wait(until.elementLocated(pageFactory.commonLocators.okayButton), 5000)
    .click();
};

const elementClearSendKeysEnter = async (element, text) => {
  let webelement = await driver.wait(until.elementLocated(element), 30000);
  try {
    await driver.wait(until.elementIsEnabled(webelement), 30000).click();
  } catch (StaleElementReferenceError) {
    console.log("got stale element reference error");
    await driver.wait(until.elementIsEnabled(webelement), 30000).click();
  }
  await driver.actions().keyDown(Key.CONTROL).sendKeys("a").perform();
  await driver
    .wait(until.elementIsEnabled(webelement), 30000)
    .sendKeys(Key.BACK_SPACE);
  await driver
    .wait(until.elementIsEnabled(webelement), 30000)
    .sendKeys(text + Key.ENTER);
};

const elementClick = async (element) => {
  try {
    await driver.wait(until.elementLocated(element), 10000).click();
  } catch (StaleElementReferenceException) {
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(element), 10000).click();
    console.log("Got Stale element reference and clicked again.");
  }
};

module.exports = {
  launchAppUrl,
  wiseLogin,
  browserType,
  enterOTP,
  assertText,
  elementIsDisabled,
  elementIsEnabled,
  errorHandling,
  elementClearSendKeysEnter,
  elementClick,
  otpExpired,
};
