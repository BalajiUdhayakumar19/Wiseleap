const { Builder, By, Key, until } = require("selenium-webdriver");
let commonLocators = {
  continueWithMobile: By.xpath("//button[contains(.,'Continue with Mobile')]"),
  mobileNumberFeild: By.xpath("//*[@type='tel']"),
  getOtpButton: By.xpath("//button[contains(., 'Get OTP')]"),
  verifyButton: By.xpath("//button[contains(., 'Verify')]"),
  insituteName: By.xpath(
    '//*[@class="v-select__slot"]//span[2][text()= "Testing Institute"]'
  ),
  okayButton: By.xpath('//*[@class="row mt-3"]//button'),
};

let assertionLocators = {
  loginText: By.xpath('//div[@class="text-center"]//div[text()="Login"]'),
  alertModal: By.xpath(
    '//*[@class="custom-alert-content"]//div[text()="Please enter a valid mobile number."]'
  ),
  insituteName: By.xpath(
    '//*[@class="v-select__slot"]//span[2][text()= "Testing Institute"]'
  ),
  accountMenu: By.xpath(
    '//*[@class="v-btn__content"]//child::span[2][text()="Account"]'
  ),
  courseName: By.xpath(
    "//div[@class='text--24 font-weight--600' and contains(text(), 'Classroom for Automated testing')]"
  ),
  createButton: By.xpath('//div[@class="d-flex justify-end"]//button'),
  startSessionButton: By.xpath(
    '//*[@id="main-scrollable-parent"]//*[text()="Start  Session "]'
  ),
  dateLocator: By.xpath(
    '//*[@class="d-flex align-center flex-wrap mt-1 text--12 greySecondary--text font-weight--500"]//div'
  ),
  timeLocator: By.xpath(
    '//*[@class="d-flex align-center flex-wrap mt-1 text--12 greySecondary--text font-weight--500"]//div[text()="10:00 PM"]'
  ),
  durationLocator: By.xpath(
    '//*[@class="d-flex align-center flex-wrap mt-1 text--12 greySecondary--text font-weight--500"]//div[text()="60 minutes"]'
  ),
};

let courseNavigation = {
  groupCourse: By.xpath(
    "//a[contains(@href, '/live-courses') and contains(@class, 'nav-item')]"
  ),
  courseModule: By.xpath(
    "//img[contains(@src, 'classroom_covers')]/following-sibling::div//a[contains(text(), 'Classroom for Automated testing')]"
  ),
};

let sessionLocators = {
  liveSessionTab: By.xpath(
    '//*[@id="main-scrollable-parent"]//a[text()="Live Sessions"]'
  ),
  scheduleSession: By.xpath(
    '//*[@class="d-flex align-center"]//span[text()= " Schedule Sessions"]'
  ),
  scheduleSessionButton: By.xpath(
    '//div[@class="d-sm-flex justify-center mt-4"]//button[2]'
  ),
};

let scheduleSession = {
  addSessionButton: By.xpath(
    '//*[@id="main-scrollable-parent"]//*[text()="Add session "]'
  ),
  nameFeild: By.xpath(
    '//div[@class="row"]//div[text()="Session name"]/following-sibling::div//input[@type="text" and not(@readonly) and not(@autocomplete="off")]'
  ),
  timeFeild: By.xpath("(//input[@type='text'])[5]"),
  dateFeild: By.xpath(
    '//*[@class="pa-2 d-flex align-center justify-center date-card"]//div'
  ),
  selectTime: By.xpath(
    '//div[@class="v-list-item__content"]//*[text()="10:00"]'
  ),
  dropdown: By.xpath('//*[@role="listbox"]'),
  timeFormatFeild: By.xpath('//*[@class="text--16"]'),
  conflictMessage: By.xpath('//span[contains(text(), "Conflicts")]'),
  resolveButton: By.xpath('//span[contains(text(), "Resolve later")]'),
  createButton: By.xpath(
    '//div[@class="d-flex justify-end"]//span[text()= " Create "]'
  ),
};

module.exports = {
  commonLocators,
  assertionLocators,
  courseNavigation,
  sessionLocators,
  scheduleSession,
};
