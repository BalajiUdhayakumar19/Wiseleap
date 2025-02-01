const utility = require("../UI_handler/utility");
const { Builder, By, Key, until } = require("selenium-webdriver");
const pageFactory = require("../UI_handler/page_factory");
const dataprovider = require("../UI_handler/data_provider");
const assert = require("assert");

const validateLoginPage = async () => {
  await utility.assertText(
    pageFactory.assertionLocators.loginText,
    dataprovider.assertionData.login
  );
  console.log("Login Text is present");
};
const navigateToCourse = async () => {
  await driver
    .wait(until.elementLocated(pageFactory.courseNavigation.groupCourse), 5000)
    .click();
  await driver
    .wait(until.elementLocated(pageFactory.courseNavigation.courseModule), 5000)
    .click();
  console.log("Course link is clicked");
};

const navigateToLiveSession = async () => {
  try {
    await driver
      .wait(
        until.elementLocated(pageFactory.sessionLocators.liveSessionTab),
        5000
      )
      .click();
  } catch (StaleElementReferenceError) {
    console.log("got stale element reference error");
    await driver
      .wait(
        until.elementLocated(pageFactory.sessionLocators.liveSessionTab),
        5000
      )
      .click();
  }
};

const navigateToScheduleSession = async (name) => {
  try {
    await driver
      .wait(
        until.elementLocated(pageFactory.sessionLocators.scheduleSession),
        5000
      )
      .click();
  } catch (e) {
    await driver
      .wait(
        until.elementLocated(pageFactory.sessionLocators.scheduleSessionButton),
        5000
      )
      .click();
    console.log("Schedule Session button Clicked");
  }
  await utility.elementIsDisabled(
    pageFactory.assertionLocators.createButton,
    "Create button is in Disabled state"
  );
  await driver.sleep(5000);

  await utility.elementClearSendKeysEnter(
    pageFactory.scheduleSession.nameFeild,
    name
  );
  console.log("Title added");
};
const addSession = async (time) => {
  await driver
    .wait(
      until.elementLocated(pageFactory.scheduleSession.addSessionButton),
      5000
    )
    .click();
  console.log("got stale element reference error");
  await driver.sleep(500);
  await utility.elementClearSendKeysEnter(
    pageFactory.scheduleSession.timeFeild,
    time
  );

  console.log("time set");
  let timeFormat;
  try {
    timeFormat = await driver.wait(
      until.elementLocated(pageFactory.scheduleSession.timeFormatFeild),
      5000
    );
    let currentValue = await timeFormat.getAttribute("innerText");
    console.log(currentValue);
    if (currentValue === "AM") {
      await driver.sleep(5000);
      await timeFormat.click();
    } else {
      console.log("currentValue is PM");
    }
  } catch (StaleElementReferenceError) {
    timeFormat = await driver.wait(
      until.elementLocated(pageFactory.scheduleSession.timeFormatFeild),
      5000
    );
    let currentValue = await timeFormat.getAttribute("innerText");
    console.log(currentValue);
    if (currentValue === "AM") {
      await driver.sleep(5000);
      await timeFormat.click();
    } else {
      console.log("currentValue is PM");
    }
  }
};

const createLiveSession = async () => {
  let conflictMessage;
  try {
    conflictMessage = await driver.wait(
      until.elementLocated(pageFactory.scheduleSession.conflictMessage),
      3000
    );
    await driver.wait(until.elementIsVisible(conflictMessage), 3000);
  } catch (e) {
    conflictMessage = null;
  }
  try {
    if (conflictMessage) {
      console.log("Got Conflicts Clicking Resolve later Button");
      let resolveLaterButton = await driver.wait(
        until.elementLocated(pageFactory.scheduleSession.resolveButton),
        10000
      );
      await resolveLaterButton.click();
    }

    console.log("Resolve later button is clicked ");
    await driver.sleep(5000);
    let createButton = await driver.wait(
      until.elementLocated(pageFactory.scheduleSession.createButton),
      10000
    );
    await createButton.click();
    console.log("Successufully scheduled a Live session");
  } catch (StaleElementReferenceError) {
    console.log("got stale element reference error");
    await driver.sleep(5000);
    await driver
      .wait(
        until.elementLocated(pageFactory.scheduleSession.createButton),
        10000
      )
      .click();
    console.log("Successufully scheduled a Live session");
  }
};

const validateSessionButton = async () => {
  await utility.elementIsEnabled(
    pageFactory.assertionLocators.startSessionButton,
    "Start session button is enabled"
  );
};

const validateHomePage = async () => {
  await utility.assertText(
    pageFactory.assertionLocators.insituteName,
    dataprovider.assertionData.nameOfInsititute
  );
  console.log("sucessfully login with Wise-app");
  await utility.assertText(
    pageFactory.assertionLocators.accountMenu,
    dataprovider.assertionData.Account
  );
};

const validateCoursePage = async () => {
  await utility.assertText(
    pageFactory.assertionLocators.courseName,
    dataprovider.assertionData.nameOfCourse
  );
  console.log("Navigated to course page");
};

const validateCreatedSession = async () => {
  let dateElement = await driver.wait(
    until.elementLocated(pageFactory.assertionLocators.dateLocator),
    5000
  );
  let timeElement = await driver.wait(
    until.elementLocated(pageFactory.assertionLocators.timeLocator),
    5000
  );
  let durationElement = await driver.wait(
    until.elementLocated(pageFactory.assertionLocators.durationLocator),
    5000
  );
  await driver.sleep(5000);
  let actualDate = await dateElement.getText();
  let actualTime = await timeElement.getText();
  let actualDuration = await durationElement.getText();
  await driver.sleep(5000);
  console.log("Extracted Date:", actualDate);
  console.log("Extracted Time:", actualTime);
  console.log("Extracted Duration:", actualDuration);
  let formattedActualDate = new Date(actualDate).toISOString().split("T")[0];
  const expectedDate = new Date().toISOString().split("T")[0];
  const expectedTime = dataprovider.liveSessionData.time;
  const expectedDuration = dataprovider.liveSessionData.duration;
  console.log(
    `|Actual value: ${formattedActualDate}| |Expected value: ${expectedDate}|`
  );
  console.log(
    `|Actual value: ${actualTime}| |Expected value: ${expectedTime}|`
  );
  console.log(
    `|Actual value: ${actualDuration}| |Expected value: ${expectedDuration}|`
  );
  assert.strictEqual(
    formattedActualDate,
    expectedDate,
    `Date mismatch! Expected: ${expectedDate}, Found: ${formattedActualDate}`
  );
  assert.strictEqual(
    actualTime,
    expectedTime,
    `Time mismatch! Expected: ${expectedTime}, Found: ${actualTime}`
  );
  assert.strictEqual(
    actualDuration,
    expectedDuration,
    `Duration mismatch! Expected: ${expectedDuration}, Found: ${actualDuration}`
  );
};

module.exports = {
  validateLoginPage,
  validateHomePage,
  navigateToCourse,
  validateCoursePage,
  navigateToLiveSession,
  validateSessionButton,
  addSession,
  createLiveSession,
  navigateToScheduleSession,
  validateCreatedSession,
};
