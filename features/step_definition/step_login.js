const { Before, Given, When, Then } = require("@cucumber/cucumber");
const utility = require("../UI_handler/utility");
const pageAction = require("../page_action/login");
const dataprovider = require("../UI_handler/data_provider");

// - scenario 1 --

Given("user is on the Wise app login page", async function () {
  await pageAction.validateLoginPage();
});

When("user selects Login with Mobile number method", async function () {});

When("user adds mobile number and otp", async function () {
  await utility.wiseLogin(dataprovider.loginData.mobileNumber);
});

Then("user validates the home page of wise app", async function () {
  await pageAction.validateHomePage();
});

// - scenario 2 --

Given("user is on the Wise app home page", async function () {});

When("user selects group courses from side menu", async function () {
  await pageAction.navigateToCourse();
});

When(
  "user clicks the classroom for automated testing course",
  async function () {
    await pageAction.validateCoursePage();
  }
);

Then("user should be naviagte to the selected course", async function () {
  await pageAction.validateSessionButton();
});

// - scenario 3 --

Given("user is on the course page", async function () {});

When("user navigates to Live session Tab", async function () {
  await pageAction.navigateToLiveSession();
});

When("user clicks the schedule session button", async function () {
  await pageAction.navigateToScheduleSession("BUK Automation Testing");
});

When("user clicks create button", async function () {
  await pageAction.addSession("10:00");
  await pageAction.createLiveSession();
});

Then(
  "the user validates that the session is successfully created",
  async function () {
    await pageAction.validateCreatedSession();
  }
);
