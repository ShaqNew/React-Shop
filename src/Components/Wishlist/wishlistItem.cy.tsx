import React from 'react'
import '@types/jest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import WishlistItem from './wishlistItem'
import mockDataSingle from '../../../cypress/mockDataSingle.json'

describe('<WishlistItem />', () => {
  it('renders with correct elements', () => {
    cy.mount(
      <Provider store={store}>
        <WishlistItem
          item = {mockDataSingle[0]}
        />
      </Provider>
    )
    cy.get('[data-testid="wishlist-item-name"]').contains('Mens Casual Slim Fit')
    cy.get('[data-testid="wishlist-item-image"]')
    cy.get('[data-testid="wishlist-item-price"]').contains('£15.99')
    cy.get('[data-testid="wishlist-item-remove"]')
    cy.get('[data-testid="wishlist-item-cart"]')
  })
})