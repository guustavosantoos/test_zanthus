class CartPage {
  get pageTitle()           { return cy.get('[data-test="title"]'); }
  get cartItems()           { return cy.get('[data-test="inventory-item"]'); }
  get continueShoppingBtn() { return cy.get('[data-test="continue-shopping"]'); }
  get checkoutBtn()         { return cy.get('[data-test="checkout"]'); }

  cartItemByName(productName) {
    return cy.contains('[data-test="inventory-item-name"]', productName)
      .parents('[data-test="inventory-item"]');
  }

  itemQuantityByName(productName) {
    return this.cartItemByName(productName).find('[data-test="item-quantity"]');
  }

  itemPriceByName(productName) {
    return this.cartItemByName(productName).find('[data-test="inventory-item-price"]');
  }

  visit() {
    cy.visit('/cart.html');
    return this;
  }

  continueShopping() {
    this.continueShoppingBtn.click();
    return this;
  }

  proceedToCheckout() {
    this.checkoutBtn.click();
    return this;
  }

  assertPageLoaded() {
    this.pageTitle.should('be.visible').and('have.text', 'Your Cart');
    cy.url().should('include', '/cart.html');
    return this;
  }

  assertProductInCart(productName) {
    this.cartItemByName(productName).should('be.visible');
    return this;
  }

  assertItemQuantity(productName, quantity) {
    this.itemQuantityByName(productName)
      .should('be.visible')
      .and('have.text', String(quantity));
    return this;
  }

  assertCartItemCount(count) {
    this.cartItems.should('have.length', count);
    return this;
  }

  assertCartIsEmpty() {
    this.cartItems.should('not.exist');
    return this;
  }
}

module.exports = new CartPage();
