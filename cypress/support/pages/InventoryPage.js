/**
 * Page Object: InventoryPage
 * Encapsula todos os seletores e ações da página de produtos (inventory) do SauceDemo.
 */
class InventoryPage {
  // ─── Seletores ───────────────────────────────────────────────────────────
  get pageTitle()       { return cy.get('[data-test="title"]'); }
  get sortDropdown()    { return cy.get('[data-test="product-sort-container"]'); }
  get inventoryList()   { return cy.get('[data-test="inventory-container"]'); }
  get inventoryItems()  { return cy.get('[data-test="inventory-item"]'); }
  get cartBadge()       { return cy.get('[data-test="shopping-cart-badge"]'); }
  get cartLink()        { return cy.get('[data-test="shopping-cart-link"]'); }

  /**
   * Retorna o botão "Add to Cart" de um produto específico pelo seu ID.
   * @param {string} productId - ex: 'sauce-labs-backpack'
   */
  addToCartButton(productId) {
    return cy.get(`[data-test="add-to-cart-${productId}"]`);
  }

  /**
   * Retorna o botão "Remove" de um produto específico pelo seu ID.
   * @param {string} productId
   */
  removeButton(productId) {
    return cy.get(`[data-test="remove-${productId}"]`);
  }

  /**
   * Retorna o card do produto que contém o nome especificado.
   * @param {string} productName - nome exato do produto
   */
  productCardByName(productName) {
    return cy.contains('[data-test="inventory-item-name"]', productName)
      .parents('[data-test="inventory-item"]');
  }

  // ─── Ações ───────────────────────────────────────────────────────────────

  /**
   * Navega diretamente para a página de produtos (requer login prévio).
   */
  visit() {
    cy.visit('/inventory.html');
    return this;
  }

  /**
   * Ordena os produtos usando o dropdown.
   * @param {'az'|'za'|'lohi'|'hilo'} option
   */
  sortBy(option) {
    this.sortDropdown.select(option);
    return this;
  }

  /**
   * Adiciona um produto ao carrinho pelo seu ID de produto.
   * @param {string} productId - ex: 'sauce-labs-backpack'
   */
  addToCart(productId) {
    this.addToCartButton(productId).click();
    return this;
  }

  /**
   * Navega para o carrinho de compras.
   */
  goToCart() {
    this.cartLink.click();
    return this;
  }

  // ─── Asserções ───────────────────────────────────────────────────────────

  /**
   * Valida que a página de produtos está carregada com o título correto.
   */
  assertPageLoaded() {
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    this.inventoryList.should('be.visible');
    return this;
  }

  /**
   * Valida que o badge do carrinho exibe a quantidade correta.
   * @param {number} count
   */
  assertCartBadgeCount(count) {
    this.cartBadge.should('be.visible').and('have.text', String(count));
    return this;
  }

  /**
   * Valida que o botão "Remove" está visível para o produto (confirmando que foi adicionado).
   * @param {string} productId
   */
  assertProductAddedToCart(productId) {
    this.removeButton(productId).should('be.visible');
    return this;
  }

  /**
   * Valida que a lista de produtos não está vazia.
   */
  assertProductsVisible() {
    this.inventoryItems.should('have.length.greaterThan', 0);
    return this;
  }
}

module.exports = new InventoryPage();
