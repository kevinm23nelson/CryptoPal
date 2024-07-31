describe('Dashboard', () => {
  beforeEach(() => {
    // Visit the dashboard
    cy.visit('http://localhost:3000');
  });

  it('displays the sidebar correctly', () => {
    // Assert that the sidebar header says CryptoPal
    cy.get('.app-sidebar').within(() => {
      cy.get('.sidebar-header').should('contain.text', 'CryptoPal');

      // Assert that the sidebar has two buttons: Dashboard and Explore
      cy.get('.sidebar-links').within(() => {
        cy.get('.sidebar-button').eq(0).should('contain.text', 'Dashboard');
        cy.get('.sidebar-button').eq(1).should('contain.text', 'Explore');
      });
    });
  });

  it('displays the dashboard correctly', () => {
    // Assert that the dashboard header says Dashboard
    cy.get('.dashboard-header').should('contain.text', 'Dashboard');

    // Assert that there is a filter with the correct options
    cy.get('.filter-select').within(() => {
      cy.get('option').eq(0).should('have.text', 'Default (Rank/MarketCap)').and('have.value', 'rank');
      cy.get('option').eq(1).should('have.text', 'Change Up (24hr +)').and('have.value', '24hrpositive');
      cy.get('option').eq(2).should('have.text', 'Change Down (24hr -)').and('have.value', '24hrnegative');
      cy.get('option').eq(3).should('have.text', 'Change (1 Year)').and('have.value', '1year');
    });

    // Assert that there is a section for CurrencyCards with a header Favorite Currencies
    cy.get('.currency-cards').within(() => {
      cy.get('.currency-cards-header').should('contain.text', 'Favorite Currencies');

      // Assert that the message "No favorites selected. Go to the "Explore" page!" is displayed
      cy.get('.no-favorites-message').should('contain.text', 'No favorites selected. Go to the "Explore" page!');
    });
  });
});
