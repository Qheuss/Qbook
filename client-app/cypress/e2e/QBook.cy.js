describe('QBook', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('visiting the online website', () => {
    cy.visit('https://qheusse.com');
  });

  it('the h1 contains the correct text', () => {
    cy.get('h1').contains('Cliquez ici pour me contacter!');
  });

  it('the h1 contains the correct text (with data-test)', () => {
    cy.getByData('cliquezici').contains('Cliquez ici pour me contacter!');
  });

  it('testing the paragraphs', () => {
    cy.get('p').eq(0).contains('Ayant récemment terminé');
    cy.get('p').eq(1).contains('Réalisations:');
    cy.get('p').eq(2).contains('COMPÉTENCES');
  });
});
