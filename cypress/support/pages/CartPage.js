/**
 * Page Object: CartPage
 * Encapsula todos os seletores e ações da página do carrinho de compras do SauceDemo.
 */
class CartPage {
  // ─── Seletores ───────────────────────────────────────────────────────────
  get pageTitle()          { return cy.get('[data-test="title"]'); }
  get cartItems()          { return cy.get('[data-test="inventory-item"]'); }
  get continueShoppingBtn(){ return cy.get('[data-test="continue-shopping"]'); }
  get checkoutBtn()        { return cy.get('[data-test="checkout"]'); }

  /**
   * Retorna o elemento do item no carrinho pelo nome do produto.
   * @param {string} productName
   */
  cartItemByName(productName) {
    return cy.contains('[data-test="inventory-item-name"]', productName)
      .parents('[data-test="inventory-item"]');
  }

  /**
   * Retorna a quantidade do item no carrinho pelo nome do produto.
   * @param {string} productName
   */
  itemQuantityByName(productName) {
    return this.cartItemByName(productName).find('[data-test="item-quantity"]');
  }

  /**
   * Retorna o preço do item no carrinho pelo nome do produto.
   * @param {string} productName
   */
  itemPriceByName(productName) {
    return this.cartItemByName(productName).find('[data-test="inventory-item-price"]');
  }

  // ─── Ações ───────────────────────────────────────────────────────────────

  /**
   * Navega diretamente para o carrinho (requer login prévio).
   */
  visit() {
    cy.visit('/cart.html');
    return this;
  }

  /**
   * Clica em "Continue Shopping" para voltar ao catálogo.
   */
  continueShopping() {
    this.continueShoppingBtn.click();
    return this;
  }

  /**
   * Clica em "Checkout" para iniciar o processo de checkout.
   */
  proceedToCheckout() {
    this.checkoutBtn.click();
    return this;
  }

  // ─── Asserções ───────────────────────────────────────────────────────────

  /**
   * Valida que a página do carrinho está carregada corretamente.
   */
  assertPageLoaded() {
    this.pageTitle.should('be.visible').and('have.text', 'Your Cart');
    cy.url().should('include', '/cart.html');
    return this;
  }

  /**
   * Valida que um produto específico está presente no carrinho.
   * @param {string} productName - nome exato do produto
   */
  assertProductInCart(productName) {
    this.cartItemByName(productName).should('be.visible');
    return this;
  }

  /**
   * Valida que a quantidade do item no carrinho é a esperada.
   * @param {string} productName
   * @param {number} quantity
   */
  assertItemQuantity(productName, quantity) {
    this.itemQuantityByName(productName)
      .should('be.visible')
      .and('have.text', String(quantity));
    return this;
  }

  /**
   * Valida o número total de itens distintos no carrinho.
   * @param {number} count
   */
  assertCartItemCount(count) {
    this.cartItems.should('have.length', count);
    return this;
  }

  /**
   * Valida que o carrinho está vazio.
   */
  assertCartIsEmpty() {
    this.cartItems.should('not.exist');
    return this;
  }
}

module.exports = new CartPage();
