import InventoryPage from '../support/pages/InventoryPage';
import CartPage      from '../support/pages/CartPage';

describe('Adicionar produto ao carrinho', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  context('happy path', () => {
    it('adiciona o Backpack ao carrinho e valida no checkout', () => {
      const product = testData.products.backpack;

      InventoryPage.assertPageLoaded();
      InventoryPage.assertProductsVisible();
      InventoryPage.addToCart(product.id);
      InventoryPage.assertCartBadgeCount(1);
      InventoryPage.assertProductAddedToCart(product.id);
      InventoryPage.goToCart();

      CartPage.assertPageLoaded();
      CartPage.assertProductInCart(product.name);
      CartPage.assertItemQuantity(product.name, 1);
      CartPage.assertCartItemCount(1);
    });
  });

  context('ordenação de produtos', () => {
    it('ordena por preço crescente e adiciona o mais barato', () => {
      InventoryPage.assertPageLoaded();
      InventoryPage.sortBy('lohi');

      cy.get('[data-test="inventory-item-price"]').first().then(($first) => {
        const firstPrice = parseFloat($first.text().replace('$', ''));
        cy.get('[data-test="inventory-item-price"]').last().then(($last) => {
          const lastPrice = parseFloat($last.text().replace('$', ''));
          expect(firstPrice).to.be.lessThan(lastPrice);
        });
      });

      cy.get('[data-test^="add-to-cart-"]').first().click();
      InventoryPage.assertCartBadgeCount(1);

      InventoryPage.goToCart();
      CartPage.assertPageLoaded();
      CartPage.assertCartItemCount(1);
    });

    it('ordena por nome de Z para A', () => {
      InventoryPage.assertPageLoaded();
      InventoryPage.sortBy('za');

      cy.get('[data-test="inventory-item-name"]').then(($items) => {
        const names = [...$items].map((el) => el.textContent);
        const sorted = [...names].sort().reverse();
        expect(names).to.deep.equal(sorted);
      });
    });
  });

  context('múltiplos produtos', () => {
    it('adiciona dois produtos distintos e valida ambos no carrinho', () => {
      const backpack  = testData.products.backpack;
      const bikeLight = testData.products.bikeLight;

      InventoryPage.assertPageLoaded();
      InventoryPage.addToCart(backpack.id);
      InventoryPage.assertCartBadgeCount(1);
      InventoryPage.addToCart(bikeLight.id);
      InventoryPage.assertCartBadgeCount(2);

      InventoryPage.goToCart();
      CartPage.assertPageLoaded();
      CartPage.assertProductInCart(backpack.name);
      CartPage.assertProductInCart(bikeLight.name);
      CartPage.assertCartItemCount(2);
    });
  });

  context('carrinho vazio', () => {
    it('exibe carrinho sem itens quando nenhum produto foi adicionado', () => {
      InventoryPage.goToCart();
      CartPage.assertPageLoaded();
      CartPage.assertCartIsEmpty();
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });
  });
});
