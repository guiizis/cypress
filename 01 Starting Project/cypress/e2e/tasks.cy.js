/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');

    // Open the modal
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('#new-task-form').should('be.visible');

    // Close the modal
    cy.contains('Cancel').click();
    cy.get('#new-task-form').should('not.exist');
  });
});