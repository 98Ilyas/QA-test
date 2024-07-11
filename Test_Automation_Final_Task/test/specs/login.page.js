// login.page.js
class LoginPage {
    get usernameInput() { return $('#problem_user'); }
    get passwordInput() { return $('#secret_sauce'); }
    get loginButton() { return $('.btn_action'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get dashboardTitle() { return $('.title'); }

    open() {
        browser.url('https://www.saucedemo.com/');
    }

    login(username, password) {
        this.usernameInput.setValue(username);
        this.passwordInput.setValue(password);
        this.loginButton.click();
    }

    clearUsername() {
        this.usernameInput.setValue('');
    }

    clearPassword() {
        this.passwordInput.setValue('');
    }

    getErrorMessageText() {
        return this.errorMessage.getText();
    }

    getDashboardTitleText() {
        return this.dashboardTitle.getText();
    }
}

module.exports = new LoginPage();
