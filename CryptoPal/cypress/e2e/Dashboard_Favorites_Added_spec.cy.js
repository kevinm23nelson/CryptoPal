describe('Dashboard with Favorites', () => {
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
      },
      {
        "id": "ethereum",
        "rank": "2",
        "symbol": "ETH",
        "name": "Ethereum",
        "supply": "101160540.0000000000000000",
        "maxSupply": null,
        "marketCapUsd": "40967739219.6612727047843840",
        "volumeUsd24Hr": "1026669440.6451482672850841",
        "priceUsd": "404.9774667045200896",
        "changePercent24Hr": "-0.0999626159535347",
        "vwap24Hr": "415.3288028454417241"
      },
      {
        "id": "bibox-token",
        "rank": "100",
        "symbol": "BIX",
        "name": "Bibox Token",
        "supply": "102339166.0000000000000000",
        "maxSupply": null,
        "marketCapUsd": "72116102.5394724649666992",
        "volumeUsd24Hr": "45084130.4166935808283857",
        "priceUsd": "0.7046774500729512",
        "changePercent24Hr": "-3.0331628584946192",
        "vwap24Hr": "0.7207903092174193"
      },
      {
        "id": "tron",
        "rank": "10",
        "symbol": "TRX",
        "name": "TRON",
        "supply": "102339166.0000000000000000",
        "maxSupply": null,
        "marketCapUsd": "72116102.5394724649666992",
        "volumeUsd24Hr": "45084130.4166935808283857",
        "priceUsd": "117.046774500729512",
        "changePercent24Hr": "5.0331628584946192",
        "vwap24Hr": "0.7207903092174193"
      }
    ];
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));

    cy.visit('http://localhost:3000/');
  });

  it('Should display favorited currencies on the Dashboard loaded from Local Storage', () => {
    cy.get('.dashboard').should('exist');
    cy.contains('.currency-card', 'Bitcoin').should('exist');
    cy.contains('.currency-card', 'Ethereum').should('exist');
    cy.contains('.currency-card', 'Bibox Token').should('exist');
    cy.contains('.currency-card', 'TRON').should('exist');
  });

  it('Should display correct details for the Bitcoin card', () => {
    cy.contains('.currency-card', 'Bitcoin').within(() => {
      cy.get('.currency-header').should('contain.text', 'Bitcoin (BTC)');
      cy.get('.currency-rank').should('contain.text', 'Rank: 1');
      cy.get('.currency-price').should('contain.text', 'Price: $6,931.51');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): -0.81%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $119,179,791,817.67');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): 125.56%')
      cy.get('.favorite-button').contains('Remove Favorite').should('exist')
      cy.get('.dashboard-view-details-button').contains('View Details').should('exist')
    });
  });

  it('Should display correct details for the TRON card', () => {
    cy.contains('.currency-card', 'TRON').within(() => {
      cy.get('.currency-header').should('contain.text', 'TRON(TRX)');
      cy.get('.currency-rank').should('contain.text', 'Rank: 10');
      cy.get('.currency-price').should('contain.text', 'Price: $117.05');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): 5.03%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $72,116,102.54');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): 74.80%')
      cy.get('.favorite-button').contains('Remove Favorite').should('exist')
      cy.get('.dashboard-view-details-button').contains('View Details').should('exist')
    });
  });

  it('Should apply correct CSS classes based on 24hr change percentage', () => {
    cy.get('.currency-card').within(() => {
      cy.contains('.currency-item', 'TRON')
        .should('have.class', 'positive'); 

      cy.contains('.currency-item', 'Bitcoin')
        .should('have.class', 'negative');
    });
  });

  it('Should remove Bitcoin from favorites and update Dashboard', () => {
    // Click "Remove Favorite" for Bitcoin
    cy.contains('.currency-card', 'Bitcoin').within(() => {
      cy.get('.favorite-button').contains('Remove Favorite').click();
    });

    // Verify that Bitcoin is removed from the Dashboard
    cy.contains('.currency-card', 'Bitcoin').should('not.exist');
  });

  it('Should verify Bitcoin is removed from Local Storage', () => {
    // Click "Remove Favorite" for Bitcoin
    cy.contains('.currency-card', 'Bitcoin').within(() => {
      cy.get('.favorite-button').contains('Remove Favorite').click();
    });
    cy.wait(1000); // Adjust the delay if needed
    cy.window().then((win) => {
      const favoriteCurrencies = JSON.parse(win.localStorage.getItem('favoriteCurrencies'));
      expect(favoriteCurrencies).to.not.deep.include({
        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        supply: '17193925.0000000000000000',
        maxSupply: '21000000.0000000000000000',
        marketCapUsd: '119179791817.6740161068269075',
        volumeUsd24Hr: '2928356777.6066665425687196',
        priceUsd: '6931.5058555666618359',
        changePercent24Hr: '-0.8101417214350335',
        vwap24Hr: '7175.0663247679233209'
      });
    });
  });
  
});
