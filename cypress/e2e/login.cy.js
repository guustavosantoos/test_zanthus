/**
 * Spec: login.cy.js
 * Testa os cenários de autenticação da página de login do SauceDemo.
 *
 * Cobre:
 *  - Login com credenciais válidas
 *  - Login com usuário bloqueado
 *  - Login com credenciais inválidas
 *  - Login com campos em branco
 */

import LoginPage from '../support/pages/LoginPage';

describe('Autenticação - Página de Login', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  // ─── Cenário de Sucesso ───────────────────────────────────────────────────
  context('Login com credenciais válidas', () => {
    it('deve redirecionar para a página de produtos ao fazer login com standard_user', () => {
      LoginPage
        .typeUsername(testData.validUser.username)
        .typePassword(testData.validUser.password)
        .clickLogin()
        .assertLoginSuccess();

      // Valida título da página de produtos
      cy.get('[data-test="title"]').should('have.text', 'Products');
    });
  });

  // ─── Cenários de Exceção ─────────────────────────────────────────────────
  context('Login com credenciais inválidas', () => {
    it('deve exibir mensagem de erro ao usar credenciais incorretas', () => {
      LoginPage
        .typeUsername(testData.invalidUser.username)
        .typePassword(testData.invalidUser.password)
        .clickLogin()
        .assertErrorContains('Username and password do not match');
    });

    it('deve exibir mensagem de erro ao usar usuário bloqueado (locked_out_user)', () => {
      LoginPage
        .typeUsername(testData.lockedUser.username)
        .typePassword(testData.lockedUser.password)
        .clickLogin()
        .assertErrorContains('Sorry, this user has been locked out');
    });

    it('deve exibir mensagem de erro ao deixar o usuário em branco', () => {
      LoginPage
        .typePassword(testData.validUser.password)
        .clickLogin()
        .assertErrorContains('Username is required');
    });

    it('deve exibir mensagem de erro ao deixar a senha em branco', () => {
      LoginPage
        .typeUsername(testData.validUser.username)
        .clickLogin()
        .assertErrorContains('Password is required');
    });
  });
});
