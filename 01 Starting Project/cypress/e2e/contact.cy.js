/// <reference types="Cypress" />

describe('contact form', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/about');
  });

  it('should submit the form', () => {
      cy.get('[data-cy="contact-btn-submit"]').as('btnSubmit');
      
      cy.get('#message').type('This is a test message');
      cy.get('#name').type('John Doe');
      cy.get('#email').type('test@email.com');

      cy.get('@btnSubmit')
      .click()
      .should('contain', 'Sending...')
      .and('be.disabled');
  });
});
