import BasePage from './base.page.js';

class LoginPage extends BasePage {
    // Selectors for page elements
    get usernameInput() { return $('[placeholder="Username"]'); }
    get passwordInput() { return $('[placeholder="Password"]'); }
    get loginButton() { return $('#login-button'); }
    get errorMessage() { return $('[data-test="error"]'); }
    // Opens the login page
    async open() {
        await super.open('https://www.saucedemo.com/');
    }
    // Performs logining with given credentials
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
    }
    // Click login button
    async submitForm() {
        await this.loginButton.click();
    }
    // Clears login form
    async clearInputs() {
        await this.usernameInput.setValue('');
        await this.passwordInput.setValue('');
    }
    // Clears login password field
    async clearPassword() {
        await this.passwordInput.setValue('');
    }
    // Receive the error message text
    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return this.errorMessage.getText();
    }
}

export default new LoginPage();