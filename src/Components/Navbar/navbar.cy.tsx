import React from 'react'
import '@types/jest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Navbar from './navbar'

describe('<Navbar />', () => {
    beforeEach(() => {
      cy.mount(
        <Provider store={store}>
          <Navbar/>
        </Provider>
      )
    })
  it('renders with its children', () => {
    cy.get('[data-testid="header"]').should('contain', 'Basic React Checkpoint')
    cy.get('[data-testid="header"]').children('.basket--hidden')
    cy.get('[data-testid="basket-counter"]').should('not.exist');
    cy.get('[data-testid="header"]').children('.wishlist--hidden')
    cy.get('[data-testid="wishlist-counter"]').should('not.exist');
  })

  it('its children respond on click', () => {
    cy.get('[data-testid="basket-button"]').click()
    cy.get('[data-testid="header"]').children('.basket--show')
    cy.get('[data-testid="basket-empty"]').should('contain',"There's nothing here yet")
    cy.get('[data-testid="wishlist-button"]').click()
    cy.get('[data-testid="header"]').children('.wishlist--show')
    cy.get('[data-testid="wishlist-empty"]').should('contain',"There's nothing here yet")
  })
})

