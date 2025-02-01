let reporter = require('cucumber-html-reporter'); 
let currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
});

let options = {
    theme: 'bootstrap',
    jsonFile: './reports/cucumber-json-report.json',
    output: './reports/cucumber-html-report.html',
    reportSuiteAsScenarios: true,
    storeScreenshots :false,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: 'wise - Automation Test Report',
    metadata: {
        "Test Environment": "Staging",
        "Browser": "Chrome",
        "Platform": "Lenevo",
        "Parallel": "None",
        "Executed": "-",
        "Date & Time": currentTime,
    }
};
exports = reporter.generate(options);
