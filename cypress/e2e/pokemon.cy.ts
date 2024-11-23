describe('Pokemon Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays the pokemon list', () => {
    cy.get('[data-testid="pokemon-grid"]').should('exist');
    cy.contains('Loading...').should('not.exist');
    cy.contains('Bulbasaur').should('be.visible');
  });

  it('filters pokemon by type', () => {
    cy.contains('Fire').click();
    cy.contains('Charmander').should('be.visible');
    cy.contains('Bulbasaur').should('not.exist');
  });

  it('searches for pokemon', () => {
    cy.get('input[placeholder="Search Pokémon..."]')
      .type('char');
    cy.contains('Charmander').should('be.visible');
    cy.contains('Bulbasaur').should('not.exist');
  });

  it('opens and closes pokemon detail modal', () => {
    cy.contains('Bulbasaur').click();
    cy.contains('Height:').should('be.visible');
    cy.contains('Weight:').should('be.visible');
    cy.get('button').contains('×').click();
    cy.contains('Height:').should('not.exist');
  });

  it('plays pokemon cry when clicking sound button', () => {
    cy.contains('Bulbasaur').click();
    cy.get('button').contains('🔊').click();
    // Note: We can't actually test the audio playing,
    // but we can verify the button exists and is clickable
  });
});
