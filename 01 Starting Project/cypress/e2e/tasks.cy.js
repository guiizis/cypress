/// <reference types="Cypress" />

describe('tasks management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should open and close the new task modal', () => {
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('#new-task-form').should('be.visible');

    cy.contains('Cancel').click();
    cy.get('#new-task-form').should('not.exist');

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
  });

  it('should create a new task', () => {
    const newTask = {
      title: 'New Task',
      summary: 'This is a new task summary',
      category: 'low'
    };

    cy.get('[data-cy="start-add-task-button"]').click();

    cy.get('#title').type(newTask.title);
    cy.get('#summary').type(newTask.summary);
    cy.get('#category').select(newTask.category);

    cy.get('[type="submit"]').click();

    cy.get('.task-list')
      .find('.task')
      .first()
      .should((li) => {
        expect(li).to.have.descendants('span');
        expect(li).to.have.descendants('h2').to.contain(newTask.title);
        expect(li).to.have.descendants('p').to.contain(newTask.summary);
      });
  });

  it('should show an alert message when try to post a new task without valid content', () => {
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[type="submit"]').click();
    cy.get('.error-message').should('have.text', 'Please provide values for task title, summary and category!');
  });
});