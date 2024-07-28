import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import ProductsPage from '../pageobjects/products.page.js';
import { loginData, errorMessages, pageTitle } from '../data/testData.js';

describe('Login Form', () => {
    // Before each test, open the login page
    beforeEach(async () => {
        await LoginPage.open();
    });
    it('UC-1: Test Login form with empty credentials', async () => {
        // Enter login and password
        await LoginPage.login(loginData.emptyCredentials.username, loginData.emptyCredentials.password);
        // Clear entered data
        await LoginPage.clearInputs();
        // Logining
        await LoginPage.submitForm();           
        try {
            // Checks if the error message is displayed and has the correct text
            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText(errorMessages.usernameRequired);
        } catch (err) {
            // If there's an error, take a screenshot and throw the error
            await browser.takeScreenshot();
            throw err;
        }
    });

    it('UC-2: Test Login form with credentials by passing Username', async () => {
        // Enter login and password
        await LoginPage.login(loginData.usernameOnly.username, loginData.usernameOnly.password);
        // Clear password
        await LoginPage.clearPassword();
        // Logining
        await LoginPage.submitForm(); 
        try {
            // Checks if the error message is displayed and has the correct text
            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText(errorMessages.passwordRequired);
        } catch (err) {
            // If there's an error, take a screenshot and throw the error
            await browser.takeScreenshot();
            throw err;
        }
    });

    // UC-3: Test login with valid credentials
    it('UC-3: Test Login form with valid credentials', async () => {
        // Logining
        await LoginPage.login(loginData.validUser.username, loginData.validUser.password, LoginPage.submitForm());
        try {
            // Checks if could get page title and has the correct page title
            await expect(await ProductsPage.getPageTitle()).toBe(pageTitle);
        } catch (err) {
            // If there's an error, take a screenshot and throw the error
            await browser.takeScreenshot();
            throw err;
        }
    });

    // UC-3: Test login with multiple sets of credentials
    loginData.multipleUsers.forEach((user) => {
        it(`UC-3: Test Login form with credentials for ${user.username}`, async () => {
            // Logining
            await LoginPage.login(user.username, user.password, LoginPage.submitForm());
            try {
                // Checks if could get page title and has the correct page title
                await expect(await ProductsPage.getPageTitle()).toBe(pageTitle);
            } catch (err) {
                // If there's an error, take a screenshot and throw the error
                await browser.takeScreenshot();
                throw err;
            }
        });
    });
});
