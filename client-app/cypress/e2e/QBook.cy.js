describe('QBook', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('visiting the online website', () => {
    cy.visit('https://qheusse.com');
  });

  it('the h1 contains the correct text', () => {
    cy.get('h1').contains('Click here to contact me!');
  });

  it('the h1 contains the correct text (with data-test)', () => {
    cy.getByData('cliquezici').contains('Click here to contact me!');
  });

  it('testing the paragraphs', () => {
    cy.get('p').eq(0).contains('During my free time');
  });
});
