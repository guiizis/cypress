/// <reference types="Cypress" />

describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should submit the form', { defaultCommandTimeout: 5000 }, () => {
    cy.task('seedDatabase', 'isJustATestFileName');
    cy.getByTestId("contact-input-message").type('Hello world!');
    cy.getByTestId("contact-input-name").type('John Doe');
    cy.getByTestId("contact-btn-submit").then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.eq('Send Message');
    });
    cy.screenshot();
    cy.getByTestId("contact-input-email").type('test@example.com');
    cy.submitForm();
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot();
    cy.getByTestId("contact-btn-submit").as('submitBtn');
    // cy.getByTestId('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');
  });

  it('should validate the form input', () => {

    cy.submitForm();
    cy.getByTestId("contact-btn-submit").then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.getByTestId("contact-btn-submit").contains('Send Message');
    cy.getByTestId("contact-input-message").as('msgInput');
    cy.get('@msgInput').focus().blur();
    cy.get('@msgInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getByTestId("contact-input-name").focus().blur();
    cy.getByTestId("contact-input-name")
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getByTestId("contact-input-email").focus().blur();
    cy.getByTestId("contact-input-email")
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })
  });
});
