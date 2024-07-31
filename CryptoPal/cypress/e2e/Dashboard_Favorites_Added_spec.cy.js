describe('Dashboard with Favorites', () => {
  beforeEach(() => {
    // Set up intercepts
    cy.setupCurrencyIntercepts();

    // Save to localStorage
    const favoriteCurrencies = [
      { id: "bitcoin" },
      { id: "ethereum" },
      { id: "bibox-token" },
      { id: "green-token" }
    ];
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));

    // Visit your application
    cy.visit('http://localhost:3000/');
  });

  it('should display favorited currencies on the Dashboard', () => {
    cy.get('.dashboard').should('exist');

    // Verify the presence of favorited currencies
    cy.contains('.currency-card', 'Bitcoin').should('exist');
    cy.contains('.currency-card', 'Ethereum').should('exist');
    cy.contains('.currency-card', 'Bibox Token').should('exist');
    cy.contains('.currency-card', 'Green Token').should('exist');
  });
});
