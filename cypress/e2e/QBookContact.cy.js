describe('QBookContact', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/contact');
  });

  it('name-label', () => {
    cy.getByTestId('name-label').contains('Name:');
  });

  it('name-input', () => {
    cy.getByTestId('name-input')
      .type('Quentin')
      .should('have.value', 'Quentin');
  });

  it('email-label', () => {
    cy.getByTestId('email-label').contains('Email address:');
  });

  it('email-input', () => {
    cy.getByTestId('email-input')
      .type('tom@aol.com')
      .should('have.value', 'tom@aol.com');
  });

  it('message-label', () => {
    cy.getByTestId('message-label').contains('Message:');
  });

  it('message-textarea', () => {
    cy.getByTestId('message-textarea')
      .type('Salut comment ça va?')
      .should('have.value', 'Salut comment ça va?');
  });

  it('honey-label', () => {
    cy.getByTestId('honey-label').contains('honey is yummy');
  });

  it('honey-input', () => {
    cy.getByTestId('honey-input').should('not.be.visible');
    cy.getByTestId('honey-input')
      .type('123', { force: true })
      .should('have.value', '123');
  });

  it('submit-button', () => {
    cy.getByTestId('submit-button')
      .contains('Send message')
      .should('have.class', 'text-fontDarker')
      .should('have.class', 'bg-searchDark');
  });

  it('test if the submit button color changes after filling all the inputs', () => {
    cy.getByTestId('name-input').type('Quentin');
    cy.getByTestId('email-input').type('tom@aol.com');
    cy.getByTestId('message-textarea').type('Salut comment ça va?');
    cy.getByTestId('submit-button')
      .contains('Send message')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
      .should('have.css', 'background-color', 'rgb(84, 192, 120)');
  });
});
