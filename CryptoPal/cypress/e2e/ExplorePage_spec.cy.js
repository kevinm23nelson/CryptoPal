describe('ExplorePage', () => {
  beforeEach(() => {
    // Set up intercepts with fixture data
    cy.setupCurrencyIntercepts();
    cy.visit('http://localhost:3000/explore');
  });

  it('displays the explore page correctly', () => {
    cy.get('.explore-page-header').should('contain.text', 'TOP 100 CURRENCIES');
    cy.get('.search-bar').should('exist');

    // Check that each currency item is displayed and has required buttons
    cy.get('.currency-list').within(() => {
      // Bitcoin
      cy.contains('.currency-list-item', 'Bitcoin').should('exist');
      cy.contains('.currency-list-item', 'Symbol: BTC').should('exist');
      cy.contains('.currency-list-item', 'Rank: 1').should('exist');
      cy.contains('.currency-list-item', 'Price: $6,929.82').should('exist');
      cy.contains('.currency-list-item', 'Change (24hr): -0.81%').should('exist');
      cy.contains('.currency-list-item', 'Favorite').should('exist'); // Check for Favorite button
      cy.contains('.currency-list-item', 'View Details').should('exist'); // Check for View Details button

      // Ethereum
      cy.contains('.currency-list-item', 'Ethereum').should('exist');
      cy.contains('.currency-list-item', 'Symbol: ETH').should('exist');
      cy.contains('.currency-list-item', 'Rank: 2').should('exist');
      cy.contains('.currency-list-item', 'Price: $404.98').should('exist');
      cy.contains('.currency-list-item', 'Change (24hr): -0.10%').should('exist');
      cy.contains('.currency-list-item', 'Favorite').should('exist'); // Check for Favorite button
      cy.contains('.currency-list-item', 'View Details').should('exist'); // Check for View Details button

      // Bibox Token
      cy.contains('.currency-list-item', 'Bibox Token').should('exist');
      cy.contains('.currency-list-item', 'Symbol: BIX').should('exist');
      cy.contains('.currency-list-item', 'Rank: 100').should('exist');
      cy.contains('.currency-list-item', 'Price: $0.70').should('exist');
      cy.contains('.currency-list-item', 'Change (24hr): -3.03%').should('exist');
      cy.contains('.currency-list-item', 'Favorite').should('exist'); 
      cy.contains('.currency-list-item', 'View Details').should('exist'); 

      // TRON
      cy.contains('.currency-list-item', 'TRON').should('exist');
      cy.contains('.currency-list-item', 'Symbol: TRX').should('exist');
      cy.contains('.currency-list-item', 'Rank: 10').should('exist');
      cy.contains('.currency-list-item', 'Price: $117.05').should('exist');
      cy.contains('.currency-list-item', 'Change (24hr): 5.04%').should('exist');
      cy.contains('.currency-list-item', 'Favorite').should('exist');
      cy.contains('.currency-list-item', 'View Details').should('exist'); 
    });
  });

  it('should toggle Favorite and Unfavorite buttons correctly', () => {
    cy.get('.currency-list').within(() => {
      cy.contains('.currency-list-item', 'TRON')
        .find('.favorite-button') 
        .should('contain.text', 'Favorite') 
        .click(); 
        
      cy.contains('.currency-list-item', 'TRON')
        .find('.favorite-button')
        .should('contain.text', 'Unfavorite')
        .click();

      cy.contains('.currency-list-item', 'TRON')
        .find('.favorite-button')
        .should('contain.text', 'Favorite');
    });
  });

  it('should apply correct CSS classes based on 24hr change percentage', () => {
    cy.get('.currency-list').within(() => {
      cy.contains('.currency-list-item', 'TRON')
        .should('have.class', 'positive'); 

      cy.contains('.currency-list-item', 'Bitcoin')
        .should('have.class', 'negative');
    });
  });
});
