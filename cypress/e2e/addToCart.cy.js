/**
 * Spec: addToCart.cy.js
 * Testa o fluxo principal do desafio:
 *   Login → Filtrar/Ordenar Produto → Adicionar ao Carrinho → Validar no Checkout
 *
 * Cobre:
 *  - Fluxo completo de sucesso (happy path)
 *  - Ordenação de produtos por preço (low to high)
 *  - Adição de múltiplos produtos
 *  - Validação da persistência dos itens no carrinho
 *  - Validação da quantidade correta
 */

import LoginPage     from '../support/pages/LoginPage';
import InventoryPage from '../support/pages/InventoryPage';
import CartPage      from '../support/pages/CartPage';

describe('Fluxo Principal: Busca, Adição ao Carrinho e Checkout', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  // Garante login antes de cada teste e reseta estado do Cypress
  beforeEach(() => {
    cy.login();
  });

  // ─── Happy Path ───────────────────────────────────────────────────────────
  context('Happy Path: Adicionar produto ao carrinho e validar no checkout', () => {
    it('deve adicionar "Sauce Labs Backpack" ao carrinho e validá-lo na página de carrinho', () => {
      const product = testData.products.backpack;

      // 1. Valida que está na página de produtos
      InventoryPage.assertPageLoaded();

      // 2. Valida que os produtos estão visíveis
      InventoryPage.assertProductsVisible();

      // 3. Adiciona o produto ao carrinho
      InventoryPage.addToCart(product.id);

      // 4. Valida badge do carrinho (deve mostrar "1")
      InventoryPage.assertCartBadgeCount(1);

      // 5. Valida que o botão mudou para "Remove" (produto está no carrinho)
      InventoryPage.assertProductAddedToCart(product.id);

      // 6. Navega para o carrinho
      InventoryPage.goToCart();

      // 7. Valida que está na página correta
      CartPage.assertPageLoaded();

      // 8. Valida que o produto correto está no carrinho
      CartPage.assertProductInCart(product.name);

      // 9. Valida quantidade = 1
      CartPage.assertItemQuantity(product.name, 1);

      // 10. Valida total de itens = 1
      CartPage.assertCartItemCount(1);
    });
  });

  // ─── Ordenação e Filtro ───────────────────────────────────────────────────
  context('Ordenação de produtos', () => {
    it('deve ordenar os produtos por preço (menor para maior) e adicionar o mais barato', () => {
      // 1. Valida que está na página de produtos
      InventoryPage.assertPageLoaded();

      // 2. Ordena por preço (menor → maior)
      InventoryPage.sortBy('lohi');

      // 3. Valida que a ordenação foi aplicada: primeiro item deve ter preço mais baixo
      cy.get('[data-test="inventory-item-price"]').first().then(($price) => {
        const firstPrice = parseFloat($price.text().replace('$', ''));
        cy.get('[data-test="inventory-item-price"]').last().then(($lastPrice) => {
          const lastPrice = parseFloat($lastPrice.text().replace('$', ''));
          expect(firstPrice).to.be.lessThan(lastPrice);
        });
      });

      // 4. Adiciona o produto mais barato (primeiro após ordenação)
      cy.get('[data-test^="add-to-cart-"]').first().click();

      // 5. Valida badge do carrinho
      InventoryPage.assertCartBadgeCount(1);

      // 6. Navega para o carrinho
      InventoryPage.goToCart();
      CartPage.assertPageLoaded();

      // 7. Valida que há exatamente 1 item no carrinho
      CartPage.assertCartItemCount(1);
    });

    it('deve ordenar os produtos por nome (Z to A)', () => {
      InventoryPage.assertPageLoaded();
      InventoryPage.sortBy('za');

      // Valida que o primeiro produto está depois do último alfabeticamente
      cy.get('[data-test="inventory-item-name"]').then(($items) => {
        const names = [...$items].map((el) => el.textContent);
        const sorted = [...names].sort().reverse();
        expect(names).to.deep.equal(sorted);
      });
    });
  });

  // ─── Múltiplos Produtos ───────────────────────────────────────────────────
  context('Múltiplos produtos no carrinho', () => {
    it('deve adicionar 2 produtos distintos e validar ambos no carrinho', () => {
      const backpack  = testData.products.backpack;
      const bikeLight = testData.products.bikeLight;

      InventoryPage.assertPageLoaded();

      // Adiciona produto 1
      InventoryPage.addToCart(backpack.id);
      InventoryPage.assertCartBadgeCount(1);

      // Adiciona produto 2
      InventoryPage.addToCart(bikeLight.id);
      InventoryPage.assertCartBadgeCount(2);

      // Navega para o carrinho
      InventoryPage.goToCart();
      CartPage.assertPageLoaded();

      // Valida que ambos os produtos estão presentes
      CartPage.assertProductInCart(backpack.name);
      CartPage.assertProductInCart(bikeLight.name);

      // Valida total de itens
      CartPage.assertCartItemCount(2);
    });
  });

  // ─── Cenário de Exceção ───────────────────────────────────────────────────
  context('Cenário de Exceção: Carrinho vazio', () => {
    it('deve exibir o carrinho vazio quando nenhum produto foi adicionado', () => {
      // Navega diretamente para o carrinho sem adicionar produtos
      InventoryPage.goToCart();
      CartPage.assertPageLoaded();

      // Valida que não há itens no carrinho
      CartPage.assertCartIsEmpty();

      // Valida que o badge do carrinho não existe (não há itens)
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });
  });
});
