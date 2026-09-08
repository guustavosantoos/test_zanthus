class InventoryPage {
  get pageTitle()      { return cy.get('[data-test="title"]'); }
  get sortDropdown()   { return cy.get('[data-test="product-sort-container"]'); }
  get inventoryList()  { return cy.get('[data-test="inventory-container"]'); }
  get inventoryItems() { return cy.get('[data-test="inventory-item"]'); }
  get cartBadge()      { return cy.get('[data-test="shopping-cart-badge"]'); }
  get cartLink()       { return cy.get('[data-test="shopping-cart-link"]'); }

  addToCartButton(productId) {
    return cy.get(`[data-test="add-to-cart-${productId}"]`);
  }

  removeButton(productId) {
    return cy.get(`[data-test="remove-${productId}"]`);
  }

  productCardByName(productName) {
    return cy.contains('[data-test="inventory-item-name"]', productName)
      .parents('[data-test="inventory-item"]');
  }

  visit() {
    cy.visit('/inventory.html');
    return this;
  }

  sortBy(option) {
    this.sortDropdown.select(option);
    return this;
  }

  addToCart(productId) {
    this.addToCartButton(productId).click();
    return this;
  }

  goToCart() {
    this.cartLink.click();
    return this;
  }

  assertPageLoaded() {
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    this.inventoryList.should('be.visible');
    return this;
  }

  assertCartBadgeCount(count) {
    this.cartBadge.should('be.visible').and('have.text', String(count));
    return this;
  }

  assertProductAddedToCart(productId) {
    this.removeButton(productId).should('be.visible');
    return this;
  }

  assertProductsVisible() {
    this.inventoryItems.should('have.length.greaterThan', 0);
    return this;
  }
}

module.exports = new InventoryPage();
