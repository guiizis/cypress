/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => { });

  it('should display a success message', () => {
    cy.intercept('POST', '/newsletter*', {
      status: 201,
      body: {
        message: 'Thanks for singing up',
      },
    }).as('newsletterSubmit');

    cy.visit('/');
    cy.task('seedDatabase');

    cy.get('[data-cy="newsletter-email"]').type('test@test.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@newsletterSubmit');
    cy.contains('Thanks for singing up');
  });

  it('should display an error message for invalid email', () => {
    cy.visit('/');
    cy.task('seedDatabase');

    cy.intercept('POST', '/newsletter*', {
      status: 400,
      body: {
        message: 'Email already exists',
      },
    }).as('newsletterSubmitError');

    cy.get('[data-cy="newsletter-email"]').type('test@test');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@newsletterSubmitError');
    cy.contains('Email already exists');
  });

  it('should successfully create a new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: {
        email: 'test@test.com'
      },
      form: true
    }).then(data => {
      expect(data.status).to.equal(201);
    });
  });
});