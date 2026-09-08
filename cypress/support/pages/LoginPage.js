/**
 * Page Object: LoginPage
 * Encapsula todos os seletores e ações da página de login do SauceDemo.
 */
class LoginPage {
  // ─── Seletores ───────────────────────────────────────────────────────────
  get usernameInput() { return cy.get('[data-test="username"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get loginButton()   { return cy.get('[data-test="login-button"]'); }
  get errorMessage()  { return cy.get('[data-test="error"]'); }

  // ─── Ações ───────────────────────────────────────────────────────────────

  /**
   * Navega para a página de login.
   */
  visit() {
    cy.visit('/');
    return this;
  }

  /**
   * Preenche o campo de usuário.
   * @param {string} username
   */
  typeUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  /**
   * Preenche o campo de senha.
   * @param {string} password
   */
  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  /**
   * Clica no botão de login.
   */
  clickLogin() {
    this.loginButton.click();
    return this;
  }

  /**
   * Realiza o fluxo completo de login.
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    this.visit();
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  // ─── Asserções ───────────────────────────────────────────────────────────

  /**
   * Valida que a mensagem de erro está visível e contém o texto esperado.
   * @param {string} text
   */
  assertErrorContains(text) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', text);
    return this;
  }

  /**
   * Valida que o usuário foi redirecionado para a página de produtos.
   */
  assertLoginSuccess() {
    cy.url().should('include', '/inventory.html');
    return this;
  }
}

module.exports = new LoginPage();
