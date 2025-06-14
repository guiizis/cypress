/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.visit('/').then(window => {
      cy.stub(window.navigator.geolocation, 'getCurrentPosition')
        .as('getCurrentPosition')
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords: {
                latitude: 37.7749,
                longitude: -122.4194,
              },
            });
          }, 1000);
        });
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getCurrentPosition').should('be.called');

    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!');
  });
});
