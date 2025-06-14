/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('locationData');
    cy.visit('/').then(window => {
      cy.get('@locationData').then((fakePosition) => {
        cy.stub(window.navigator.geolocation, 'getCurrentPosition')
          .as('getCurrentPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 1000);
          });
      });
      cy.stub(window.navigator.clipboard, 'writeText')
        .as('writeText')
        .resolves();
      
      cy.spy(window.localStorage, 'setItem').as('setLocalStoreItem')
      cy.spy(window.localStorage, 'getItem').as('getLocalStoreItem')
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getCurrentPosition').should('be.called');

    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!');
  });

  it('should share location', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('[data-cy="info-message"]').should('be.visible');

    cy.get('@setLocalStoreItem').should('be.called');
    cy.get('@getLocalStoreItem').should('be.called');
  });
});
