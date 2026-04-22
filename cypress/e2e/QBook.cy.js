describe('QBook', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('visiting the online website', () => {
    cy.visit('https://qheusse.com');
  });

  it('the h1 contains the correct text', () => {
    cy.get('h1').contains(
      /Click here to contact me!|Cliquez ici pour me contacter!/i,
    );
  });

  it('the h1 contains the correct text (with data-test)', () => {
    cy.getByTestId('cliquezici').contains(
      /Click here to contact me!|Cliquez ici pour me contacter!/i,
    );
  });

  it('testing the paragraphs', () => {
    cy.contains('p', /During my free time|Lors de mon temps libre/i);
  });
});
