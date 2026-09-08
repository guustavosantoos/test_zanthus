import LoginPage from '../support/pages/LoginPage';

describe('Login', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  context('credenciais válidas', () => {
    it('redireciona para a página de produtos', () => {
      LoginPage
        .typeUsername(testData.validUser.username)
        .typePassword(testData.validUser.password)
        .clickLogin()
        .assertLoginSuccess();

      cy.get('[data-test="title"]').should('have.text', 'Products');
    });
  });

  context('credenciais inválidas', () => {
    it('exibe erro com usuário e senha incorretos', () => {
      LoginPage
        .typeUsername(testData.invalidUser.username)
        .typePassword(testData.invalidUser.password)
        .clickLogin()
        .assertErrorContains('Username and password do not match');
    });

    it('exibe erro para usuário bloqueado', () => {
      LoginPage
        .typeUsername(testData.lockedUser.username)
        .typePassword(testData.lockedUser.password)
        .clickLogin()
        .assertErrorContains('Sorry, this user has been locked out');
    });

    it('exibe erro quando o campo usuário está vazio', () => {
      LoginPage
        .typePassword(testData.validUser.password)
        .clickLogin()
        .assertErrorContains('Username is required');
    });

    it('exibe erro quando o campo senha está vazio', () => {
      LoginPage
        .typeUsername(testData.validUser.username)
        .clickLogin()
        .assertErrorContains('Password is required');
    });
  });
});
