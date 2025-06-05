/// <reference types="Cypress" />

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should render the main page', () => {
    cy.get('[data-cy="main-header-logo"]').should('be.visible');
  });

})