describe('Dashboard', () => {
  beforeEach(() => {
    cy.setupCurrencyIntercepts();
    cy.visit('http://localhost:3000');
  });

  it('displays the dashboard correctly', () => {
    cy.get('.dashboard-header').should('contain.text', 'Dashboard');
    cy.get('.filter-select').within(() => {
      cy.get('option').eq(0).should('have.text', 'Default (Rank/MarketCap)').and('have.value', 'rank');
      cy.get('option').eq(1).should('have.text', 'Change Up (24hr +)').and('have.value', '24hrpositive');
      cy.get('option').eq(2).should('have.text', 'Change Down (24hr -)').and('have.value', '24hrnegative');
      cy.get('option').eq(3).should('have.text', 'Change (1 Year)').and('have.value', '1year');
    });

    cy.get('.currency-card').within(() => {
      cy.get('.currency-card-header').should('contain.text', 'Favorite Currencies');
      cy.get('.currency-card-body').within(() => {
        cy.get('.no-favorites-message').should('contain.text', 'No favorites selected. Go to the "Explore" page!');
      });
    });
  });

  it('displays the sidebar correctly', () => {
    cy.get('.app-sidebar').within(() => {
      cy.get('.sidebar-header').should('contain.text', 'CryptoPal');
      cy.get('.sidebar-links').within(() => {
        cy.get('.sidebar-button').eq(0).should('contain.text', 'Dashboard');
        cy.get('.sidebar-button').eq(1).should('contain.text', 'Explore');
      });
    });
  });

  it('navigates to Explore page and intercepts API calls', () => {
    cy.get('.sidebar-button').contains('Explore').click();
    cy.url().should('eq', 'http://localhost:3000/explore');
  });
});