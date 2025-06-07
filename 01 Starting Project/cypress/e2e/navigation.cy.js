/// <reference types="Cypress" />

describe('navigation test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should navigate into the rotes', () => {
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('h1').should('contain', 'About Us');

    cy.get('[data-cy="header-home-link"]').click();
    cy.get('h1').should('contain', 'Home Page');
  });
});
