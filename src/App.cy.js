import React from 'react'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App'

describe('<App />', () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
  it('renders the header, loading spinner, and products container with products in it', () => {
    // see: https://on.cypress.io/mounting-react
    cy.get('[data-testid="header"]')
    cy.get('[data-testid="spinner-container"]')
  })
  it('renders the products container with products in it', () => {
    cy.get('[data-testid="products-container"]', {timeout: 10000})
    cy.get('[data-testid="products-container"]').should('have.length.greaterThan',0)
  })
})