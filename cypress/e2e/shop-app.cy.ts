describe('tests the default screen of shopping app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })
    it('should not have any items in the basket or wishlist onload', () => {
        cy.get('[data-testid="basket-counter"]').should('have.length',0);
        cy.get('[data-testid="basket-empty"]');
        cy.get('[data-testid="wishlist-counter"]').should('have.length',0);
        cy.get('[data-testid="wishlist-empty"]');
    });

    it('should have plps listed on the page', () => {
        cy.get('[data-testid="products-container"]', {timeout: 20000})
        cy.get('[data-testid="products-container"]').should('have.length.greaterThan',0)
    });

    it('should add and remove items to wishlist from the plp', () => {
        cy.get('[data-testid="products-container"]', {timeout: 20000})
        cy.get('[data-testid="plp-add-to-wishlist"]').first().contains('Add to wishlist')
        cy.get('[data-testid="plp-add-to-wishlist"]').first().click()
        cy.get('[data-testid="plp-remove-from-wishlist"]').first().contains('Wishlisted')
        cy.get('[data-testid="wishlist-counter"]').should('have.length',1);
        cy.get('[data-testid="wishlist-button"]').click()
    });

    it('should add items to basket from the plp and wishlist', () => {
        cy.get('[data-testid="products-container"]', {timeout: 20000})
        cy.get('[data-testid="basket-counter"]').should('not.exist');
        cy.get('[data-testid="plp-add-to-cart"]').first().click()
        cy.get('[data-testid="basket-counter"]').should('contain',1);


        cy.get('[data-testid="plp-add-to-wishlist"]').first().click()
        cy.get('[data-testid="wishlist-counter"]').should('have.length',1);
        cy.get('[data-testid="wishlist-button"]').click()
        cy.get('[data-testid="wishlist-item-cart"]').click()
        cy.get('[data-testid="basket-counter"]').should('contain',2);
        cy.get('[data-testid="basket-item-quantity-value"]').should('have.value', 2)


        cy.get('[data-testid="plp-add-to-cart"]').eq(1).click();
        cy.get('[data-testid="basket-counter"]').should('contain',3);
        cy.get('[data-testid="basket-item"]').should('have.length',2);
    });

    it('should remove items from basket with quantity < 1 or item removed or all items removed', () => {
        cy.get('[data-testid="products-container"]', {timeout: 20000})
        cy.get('[data-testid="plp-add-to-cart"]').first().click()
        cy.get('[data-testid="plp-add-to-cart"]').eq(1).click();
        cy.get('[data-testid="plp-add-to-cart"]').eq(2).click();
        cy.get('[data-testid="plp-add-to-cart"]').eq(3).click();
        cy.get('[data-testid="basket-counter"]').should('contain',4);
        cy.get('[data-testid="basket-item-quantity-increment"]');
        cy.get('[data-testid="basket-button"]').click()

        cy.get('[data-testid="basket-item-quantity-increment"]').first().click();
        cy.get('[data-testid="basket-item-quantity-increment"]').first().click();
        cy.get('[data-testid="basket-item-quantity-value"]').first().should('have.value', 3);
        cy.get('[data-testid="basket-item-quantity-decrement"]').eq(3).click();
        cy.get('[data-testid="basket-item"]').should('have.length',3);
        cy.get('[data-testid="basket-counter"]').should('contain',5);

        cy.get('[data-testid="basket-item-remove"]').first().click();
        cy.get('[data-testid="basket-item"]').should('have.length',2);
        cy.get('[data-testid="basket-counter"]').should('contain',2);

        cy.get('[data-testid="empty-basket-button"]').click();
        cy.get('[data-testid="basket-item"]').should('have.length',0);
        cy.get('[data-testid="basket-counter"]').should('not.exist');

    })
});