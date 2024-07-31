describe('SearchBar', () => {
  beforeEach(() => {
    // Set up intercepts with fixture data
    cy.setupCurrencyIntercepts();
    cy.visit('http://localhost:3000/explore');
  });
  it('search bar should be able to search', () => {
    cy.get('.search-bar input').type('tron');

    cy.get('.currency-list').within(() => {
      cy.contains('.currency-list-item', 'Tron').should('exist');
      cy.contains('.currency-list-item', 'Bitcoin').should('not.exist');
      cy.contains('.currency-list-item', 'Ethereum').should('not.exist');
      cy.contains('.currency-list-item', 'Bibox Token').should('not.exist');
    });
    
    cy.get('.search-bar input').clear().type('nonexistent');

    cy.get('.currency-list').within(() => {
      cy.get('.error-message').should('contain.text', "Your search did not yield any results.");
      cy.contains('.currency-list-item').should('not.exist');
    });
  });
});