import React from 'react'
import '@types/jest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import BasketItem from './basketItem'
import mockDataSingle from '../../../cypress/mockDataSingle.json'

describe('<BasketItem />', () => {
  it('renders', () => {
    cy.mount(
      <Provider store={store}>
        <BasketItem
          item = {mockDataSingle[0]}
          quantity = {1}
        />
      </Provider>
    )
    cy.get('[data-testid="basket-item-name"]').contains('Mens Casual Slim Fit')
    cy.get('[data-testid="basket-item-image"]')
    cy.get('[data-testid="basket-item-price"]').contains('£15.99')
    cy.get('[data-testid="basket-item-remove"]')
    cy.get('[data-testid="basket-item-quantity-value"]').should('have.value', '1')
  })
})