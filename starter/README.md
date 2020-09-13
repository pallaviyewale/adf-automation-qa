## Prerequisites
- install Node 
- `npm install -g protractor` to install protractor
- `npm install` to install the project dependencies
- `webdriver-manager start` to start up a Selenium Server

## Description
- run tests: `protractor conf.js`

## Explanation
- I have learned the Protractor from scratch for this test. So I might have not used proper protractor methods. 
- I have created 4 test cases, to test the flow.
- One to login to ADF, one to create a new folder, one to check can't create new folder with same name, one to delete the folder.
- In real case, we can have a separate file to test these functionalities like in one file we can have all the test cases just to test create new folder functionality with all possible conditions.
- In another file we can have all test cases to test delete folder functionality.
- We can use page object model.
- We can create reusable methods like 'create folder', 'login with user' and we can use it in other test cases like in delete folder and make the all test cases independent. 
