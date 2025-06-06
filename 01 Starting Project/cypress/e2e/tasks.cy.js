/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('#new-task-form').should('be.visible');

    cy.contains('Cancel').click();
    cy.get('#new-task-form').should('not.exist');

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('.backdrop').click({force: true});
    cy.get('.backdrop').should('not.exist');
  });
});