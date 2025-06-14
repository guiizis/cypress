/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('seedDatabase'); // Seed the database with initial data
  });

  it('should display a list of fetched takeaways', () => {
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
});