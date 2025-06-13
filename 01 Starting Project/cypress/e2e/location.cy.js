/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.visit('/').then(window => {
      cy.stub(window.navigator.geolocation, 'getCurrentPosition').as('getCurrentPosition');
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getCurrentPosition').should('be.called');
  });
});
