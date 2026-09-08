// cypress/support/commands.js
// Comandos customizados reutilizáveis no Cypress

/**
 * Comando: cy.login(username?, password?)
 * Realiza o login via UI.
 * Se não fornecidos, usa as credenciais padrão definidas no cypress.config.js.
 *
 * @example cy.login()
 * @example cy.login('locked_out_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (
  username = Cypress.env('username'),
  password = Cypress.env('password'),
) => {
  cy.visit('/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

/**
 * Comando: cy.addProductToCartById(productId)
 * Adiciona um produto ao carrinho a partir do seu ID de produto.
 *
 * @example cy.addProductToCartById('sauce-labs-backpack')
 */
Cypress.Commands.add('addProductToCartById', (productId) => {
  cy.get(`[data-test="add-to-cart-${productId}"]`).click();
});

/**
 * Comando: cy.assertCartCount(count)
 * Valida o contador de itens no ícone do carrinho.
 *
 * @example cy.assertCartCount(2)
 */
Cypress.Commands.add('assertCartCount', (count) => {
  cy.get('[data-test="shopping-cart-badge"]')
    .should('be.visible')
    .and('have.text', String(count));
});
