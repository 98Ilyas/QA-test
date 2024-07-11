// login.spec.js
const { expect } = require('chai');
const LoginPage = require('./login.page');

describe('SauceDemo Login Form', () => {
    beforeEach(() => {
        LoginPage.open();
    });

    it('UC-1: Test Login form with empty credentials', () => {
        LoginPage.login('testuser', 'testpassword');
        LoginPage.clearUsername();
        LoginPage.clearPassword();
        LoginPage.loginButton.click();
        expect(LoginPage.getErrorMessageText()).to.include('Username is required');
    });

    it('UC-2: Test Login form with credentials by passing Username', () => {
        LoginPage.login('testuser', '');
        LoginPage.clearPassword();
        LoginPage.loginButton.click();
        expect(LoginPage.getErrorMessageText()).to.include('Password is required');
    });

    it('UC-3: Test Login form with credentials by passing Username & Password', () => {
        LoginPage.login('acceptedusername', 'secretsauce');
        expect(LoginPage.getDashboardTitleText()).to.include('Swag Labs');
    });
});
