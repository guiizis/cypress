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

    cy.get('@btnSubmit').then(($btn) => {
      expect($btn)
        .to
        .have
        .text('Send Message');

      expect($btn)
        .to
        .be
        .not
        .disabled;
    });

    cy.get('@btnSubmit')
      .click()
      .should('contain', 'Sending...')
      .and('be.disabled');
  });

  it('should submit the form with enter key', () => {
    cy.get('#message').type('This is a test message');
    cy.get('#name').type('John Doe');
    cy.get('#email').type('test@email.com{enter}');
  });

  it('should validate the form by button', () => {
    cy.get('[data-cy="contact-btn-submit"]').as('btnSubmit');

    cy.get('@btnSubmit').then(($btn) => {
      cy.wrap($btn).click();

      expect($btn)
        .to
        .be
        .not
        .disabled;

      expect($btn)
        .to
        .have
        .text('Send Message');
    })
  });

  it('should validate the form by form fields', () => {
    cy.get('[data-cy="contact-btn-submit"]').as('btnSubmit');
    const formFields = [
      {
        id: 'contact-input-message',
        validContent: 'This is a test message'
      },
      {
        id: 'contact-input-name',
        validContent: 'John Doe'
      },
      {
        id: 'contact-input-email',
        validContent: 'content@email.com'
      }
    ];

    formFields.forEach((field) => {
      cy.get(`[data-cy="${field.id}"]`).click();
    });

    cy.get('@btnSubmit').click();
    cy.get('form').find('[class*="_invalid_"]').should('have.length', formFields.length);


    formFields.forEach((field, i) => {
      cy.get(`[data-cy="${field.id}"]`).type(field.validContent);
      cy.get('@btnSubmit').click();
      cy.get('form').find('[class*="_invalid_"]').should('have.length', formFields.length - (i + 1));
    });
  });
});
