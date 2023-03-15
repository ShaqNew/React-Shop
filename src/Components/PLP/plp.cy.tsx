import React from 'react'
import '@types/jest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Plp from './plp'
import mockDataFull from '../../../cypress/mockDataFull.json'
import mockDataSingle from '../../../cypress/mockDataSingle.json'

describe('<Plp />', () => {
  it('renders a list of 20 products when given mock data', () => {
    cy.mount(
      <Provider store={store}>
        <Plp list = {mockDataFull}/>
      </Provider>
    )
    cy.get('[data-testid="plp"]').should('have.length',20)
  })

  it('renders a single plp with correctly displayed data', () => {
    cy.mount(
      <Provider store={store}>
        <Plp list = {mockDataSingle}/>
      </Provider>
      )
    cy.get('[data-testid="plp-name"]').contains('Mens Casual Slim Fit')
    cy.get('[data-testid="plp-image"]')
    cy.get('[data-testid="plp-price"]').contains('£15.99')
    cy.get('[data-testid="plp-add-to-wishlist"]').contains('Add to wishlist')
    cy.get('[data-testid="plp-add-to-cart"]').contains('Add to cart')
  })

  it('wishlist button toggle works', () => {
    cy.mount(
      <Provider store={store}>
        <Plp list = {mockDataSingle}/>
      </Provider>
      )
    cy.get('[data-testid="plp-add-to-wishlist"]').contains('Add to wishlist')
    cy.get('[data-testid="plp-add-to-wishlist"]').click()
    cy.get('[data-testid="plp-remove-from-wishlist"]').contains('Wishlisted')
    cy.get('[data-testid="plp-remove-from-wishlist"]').click()
    cy.get('[data-testid="plp-add-to-wishlist"]').contains('Add to wishlist')
  })
})