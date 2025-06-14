/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.intercept('POST', '/newsletter*', {
      status: 201,
      body: {
        message: 'Thanks for singing up',
      },
    }).as('newsletterSubmit');
    cy.visit('/');
    cy.task('seedDatabase'); // Seed the database with initial data
  });

  it('should display a success message', () => {
    cy.get('[data-cy="newsletter-email"]').type('test@test.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@newsletterSubmit');
    cy.contains('Thanks for singing up');
  });
});