Cypress.Commands.add('login', (
  username = Cypress.env('username'),
  password = Cypress.env('password'),
) => {
  cy.visit('/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('addProductToCartById', (productId) => {
  cy.get(`[data-test="add-to-cart-${productId}"]`).click();
});

Cypress.Commands.add('assertCartCount', (count) => {
  cy.get('[data-test="shopping-cart-badge"]')
    .should('be.visible')
    .and('have.text', String(count));
});
