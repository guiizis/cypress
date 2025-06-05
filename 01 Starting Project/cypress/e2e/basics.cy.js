/// <reference types="Cypress" />

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should render the main page', () => {
    cy.get('.main-header img').should('be.visible');
    cy.get('[data-cy="main-header-logo"]').should('be.visible');
  });

  it('should display the page title', () => {
    cy.get('.main-header h1').should('contain.text', 'React Tasks');
    cy.contains('React Tasks'); //check all the page
  });
});