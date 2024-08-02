describe('CurrencyDetailsPage from Dashboard', () => {
  beforeEach(() => {
    cy.setupCurrencyIntercepts();
    const favoriteCurrencies = [
      {
        "id": "bitcoin",
        "rank": "1",
        "symbol": "BTC",
        "name": "Bitcoin",
        "supply": "17193925.0000000000000000",
        "maxSupply": "21000000.0000000000000000",
        "marketCapUsd": "119179791817.6740161068269075",
        "volumeUsd24Hr": "2928356777.6066665425687196",
        "priceUsd": "6931.5058555666618359",
        "changePercent24Hr": "-0.8101417214350335",
        "vwap24Hr": "7175.0663247679233209"
      }
    ]
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));

    cy.visit('http://localhost:3000/');
  });

  it('From Dashboard - View Details button redirects to that Currencies CurrencyDetailsPage and can return back to Dashboard', () => {
    // Check if the dashboard is loaded and contains the Bitcoin currency card
    cy.get('.dashboard').should('exist');
    cy.contains('.currency-item', 'Bitcoin').should('exist');

    // Click the View Details button for Bitcoin
    cy.contains('.currency-item', 'Bitcoin').within(() => {
      cy.get('.dashboard-view-details-button').contains('View Details').click();
    });

    // Wait for the URL to update and check if it redirected to the Bitcoin details page
    cy.url().should('include', '/currency/bitcoin');

    // Wait for the intercepted requests to ensure the data is loaded
    cy.wait('@getCurrencyById');
    cy.wait('@getHistoricalData');

    // Check if the details page displays correct information
    cy.get('.currency-view-details').should('exist');
    cy.contains('.currency-view-details', 'Bitcoin').should('exist');
    cy.contains('.currency-view-details', 'BTC').should('exist');
    cy.contains('.currency-view-details', 'Supply: 17193925').should('exist');
    cy.contains('.currency-view-details', 'Max Supply: 21000000.0').should('exist');
    cy.contains('.currency-view-details', 'Market Cap USD: $119,179,791,817.67').should('exist');
    cy.contains('.currency-view-details', 'Volume USD (24Hr): $2,928,356,777.61').should('exist');
    cy.contains('.currency-view-details', 'Price USD: $6,931.51').should('exist');
    cy.contains('.currency-view-details', '-0.81%').should('exist');
    cy.contains('.currency-view-details', 'VWAP (24Hr): $7,175.07').should('exist');

    // Check if the "Return to Dashboard" button exists and click it
    cy.get('.return-button').should('exist').contains('Return to Dashboard').click();

    // Check if it redirects back to the dashboard
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('CurrencyDetailsPage from ExplorePage', () => {
  beforeEach(() => {
    cy.setupCurrencyIntercepts();
    cy.visit('http://localhost:3000/explore');
  });

  it('From ExplorePage - View Details button redirects to that CurrencyDetailsPage and can return back to ExplorePage', () => {
    cy.get('.explore-page-header').should('contain.text', 'TOP 100 CURRENCIES');
    cy.get('.currency-list').within(() => {
      cy.contains('.currency-list-item', 'Bitcoin').should('exist');
      cy.get('.view-details-button').contains('View Details').click();
    });

    cy.url().should('include', '/currency/bitcoin');
    cy.wait('@getCurrencyById').its('response.statusCode').should('eq', 200);
    cy.contains('.currency-view-details', 'Bitcoin').should('exist');
    cy.contains('.currency-view-details', 'BTC').should('exist');
    cy.contains('.currency-view-details', 'Supply: 17193925').should('exist');
    cy.contains('.currency-view-details', 'Max Supply: 21000000.0').should('exist');
    cy.contains('.currency-view-details', 'Market Cap USD: $119,179,791,817.67').should('exist');
    cy.contains('.currency-view-details', 'Volume USD (24Hr): $2,928,356,777.61').should('exist');
    cy.contains('.currency-view-details', 'Price USD: $6,931.51').should('exist');
    cy.contains('.currency-view-details', '-0.81%').should('exist');
    cy.contains('.currency-view-details', 'VWAP (24Hr): $7,175.07').should('exist');

    cy.get('.return-button').should('exist').contains('Return to Explore').click();
    cy.url().should('eq', 'http://localhost:3000/explore');
  });
});

