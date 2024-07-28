## Task - This project contains automated tests for the Sauce Demo login functionality using WebDriverIO

**Test Cases**

***UC-1: Test Login form with empty credentials***
- Type any credentials into "Username" and "Password" fields.
- Clear the inputs.
- Hit the "Login" button.
- Check the error messages: "Username is required".

***UC-2: Test Login form with credentials by passing Username***
- Type any credentials in username.
- Enter password.
- Clear the "Password" input.
- Hit the "Login" button.
- Check the error messages: "Password is required".

***UC-3: Test Login form with valid credentials***
- Enter a valid username from the Accepted usernames section.
- Enter the password "secret_sauce".
- Click Login and validate the title "Swag Labs" in the dashboard.
- Provide execution with different parameters.

**Results**

***UC-1: Test Login form with empty credentials***
1. The script successfully opened the website.
2. Enters "Username" and "Password" fields.
3. Clears "Username" and "Password" fields.
4. Fitted the "Login" button.
5. Checked the error messages: "Username is required".

***UC-2: Test Login form with credentials by passing Username***
1. The script successfully opened the website.
2. Enters "Username" and "Password" fields.
3. Clears "Password" field.
4. Fitted the "Login" button.
5. Checked the error messages: "Password is required".

***UC-3: Test Login form with valid credentials***
1. The script successfully opened the website.
2. Entered a valid username from the Accepted usernames section.
3. Clicked Login and validated the title "Swag Labs" in the dashboard.
4. Has provided execution with different parameters.

*All test cases were automated using WebDriverIO, with support for both Firefox and Chrome browsers. Locators were provided using XPath and the Page Object pattern was used. Loggers from the selected framework were also utilized.* 
