class LoginPage {
  get usernameInput() { return $('[placeholder="Username"]'); }
  get passwordInput() { return $('[placeholder="Password"]'); }
  get loginButton() { return $('#login-button'); }
  get errorMessage() { return $('[data-test="error"]'); }

  async open() {
      await browser.url('https://www.saucedemo.com/');
  }

  async login(username, password) {
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
  }

  async getErrorMessage() {
      await this.errorMessage.waitForDisplayed();
      return this.errorMessage.getText();
  }
}

export default new LoginPage();
