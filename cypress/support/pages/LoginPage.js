class LoginPage {
  get usernameInput() { return cy.get('[data-test="username"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get loginButton()   { return cy.get('[data-test="login-button"]'); }
  get errorMessage()  { return cy.get('[data-test="error"]'); }

  visit() {
    cy.visit('/');
    return this;
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  login(username, password) {
    this.visit();
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  assertErrorContains(text) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', text);
    return this;
  }

  assertLoginSuccess() {
    cy.url().should('include', '/inventory.html');
    return this;
  }
}

module.exports = new LoginPage();
