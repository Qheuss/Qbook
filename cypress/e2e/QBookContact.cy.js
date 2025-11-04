describe('QBookContact', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/contact');
  });

  it('name-label', () => {
    cy.getByData('name-label').contains('Name:');
  });

  it('name-input', () => {
    cy.getByData('name-input').type('Quentin').should('have.value', 'Quentin');
  });

  it('email-label', () => {
    cy.getByData('email-label').contains('Email address:');
  });

  it('email-input', () => {
    cy.getByData('email-input')
      .type('tom@aol.com')
      .should('have.value', 'tom@aol.com');
  });

  it('message-label', () => {
    cy.getByData('message-label').contains('Message:');
  });

  it('message-textarea', () => {
    cy.getByData('message-textarea')
      .type('Salut comment ça va?')
      .contains('Salut comment ça va?');
  });

  it('honey-label', () => {
    cy.getByData('honey-label').contains('honey is yummy');
  });

  it('honey-input', () => {
    cy.getByData('honey-input').should('not.be.visible');
    cy.getByData('honey-input')
      .type('123', { force: true })
      .should('have.value', '123');
  });

  it('submit-button', () => {
    cy.getByData('submit-button')
      .contains('Send message')
      .should('have.class', 'text-fontDarker')
      .should('have.class', 'bg-searchDark');
  });

  it('test if the submit button color changes after filling all the inputs', () => {
    cy.getByData('name-input').type('Quentin');
    cy.getByData('email-input').type('tom@aol.com');
    cy.getByData('message-textarea').type('Salut comment ça va?');
    cy.getByData('submit-button')
      .contains('Send message')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
      .should('have.css', 'background-color', 'rgb(84, 192, 120)');
  });
});
