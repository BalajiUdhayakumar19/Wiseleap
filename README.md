# Wise Live Automation

This project automates the process of scheduling a live session on the Wise app using Node.js and Selenium. Each test scenario is designed to be independent

# Pre-requesites
   - Node js
   - npm
   - cucumber: ^11.2.0
   - selenium-webdriver: ^4.28.1

# Install selenium-webdriver
   - npm install selenium-webdriver

# Install cucumber
    - npm install @cucumber/cucumber

# Clone the gitHub repo
    - https://github.com/BalajiUdhayakumar19/Wiseleap.git

# Project setup
1. navigate to your project repo through the terminal window on Visual Studio Code IDE and execute the command
    - npm init
    - npm install node

2. Finally execute your test with following command
    - npm run test:test_script_name
    - test_script_name -> refer package.json file.

3. To Generate Html Report 
    - npm run test:htmlReport 

# Folders and files details.
1. feature groups folder - contains '.feature' files which will have test cases.

2. step-definition folder - Contains the generated skeleton file.

3. page_action folder - Contains all the feature specific functions.

4. UI_handler folder - This will have 'data_provider.js', 'page_factory.js' and 'utility.js'.
    
        * data_provider.js -  Contains all the test data.

        * page_factory.js - Contains all the web-elements locations.

        * utility.js - This will have all the re-usable functions.

7. support folder - This will have 'hooks.js' file and 'htmlreport.js' file.

        * hooks.js - This contains before and after functions.

        * htmlreport.js - Run this file to get the report after the completing the test execution.

8. package.json - This will have dependencies script and script to run the tests based on tags.
