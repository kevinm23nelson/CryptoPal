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
  it('should correctly display Bitcoin card details', () => {
    cy.contains('.currency-card', 'Bitcoin').within(() => {
      cy.get('.currency-rank').should('contain.text', 'Rank: 1');
      cy.get('.currency-symbol').should('contain.text', 'Symbol: BTC');
      cy.get('.currency-price').should('contain.text', 'Price: $6,931.51');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): -0.81%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $119,179,791,817.67');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): 125.56%');
    });
  });

  it('should correctly display TRON card details', () => {
    cy.contains('.currency-card', 'TRON').within(() => {
      cy.get('.currency-rank').should('contain.text', 'Rank: 10');
      cy.get('.currency-symbol').should('contain.text', 'Symbol: TRX');
      cy.get('.currency-price').should('contain.text', 'Price: $117.05');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): 5.03%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $72,116,102.54');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): 74.80%');
    });
  });

  it('should correctly display Ethereum card details', () => {
    cy.contains('.currency-card', 'Ethereum').within(() => {
      cy.get('.currency-rank').should('contain.text', 'Rank: 2');
      cy.get('.currency-symbol').should('contain.text', 'Symbol: ETH');
      cy.get('.currency-price').should('contain.text', 'Price: $404.98');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): -0.10%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $40,967,739,219.66');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): 78.82%');
    });
  });

  it('should correctly display Bibox Token card details', () => {
    cy.contains('.currency-card', 'Bibox Token').within(() => {
      cy.get('.currency-rank').should('contain.text', 'Rank: 100');
      cy.get('.currency-symbol').should('contain.text', 'Symbol: BIX');
      cy.get('.currency-price').should('contain.text', 'Price: $0.70');
      cy.get('.currency-change').should('contain.text', 'Change (24hr): -3.03%');
      cy.get('.currency-market-cap').should('contain.text', 'Market Cap: $72,116,102.54');
      cy.get('.currency-year-change').should('contain.text', 'Change (1 year): -8.66%');
    });
  });

  it('should filter by 24hr positive change', () => {
    cy.get('.filter-select').select('Change Up (24hr +)');
    cy.get('.currency-card').find('.currency-item').should('have.length', 4).then(($cards) => {
      expect($cards.eq(0)).to.contain.text('TRON');
      expect($cards.eq(1)).to.contain.text('Ethereum');
      expect($cards.eq(2)).to.contain.text('Bitcoin');
      expect($cards.eq(3)).to.contain.text('Bibox Token');
    });
  });

  it('should filter by 24hr negative change', () => {
    cy.get('.filter-select').select('Change Down (24hr -)');
    cy.get('.currency-card').find('.currency-item').should('have.length', 4).then(($cards) => {
      expect($cards.eq(0)).to.contain.text('Bibox Token');
      expect($cards.eq(1)).to.contain.text('Bitcoin');
      expect($cards.eq(2)).to.contain.text('Ethereum');
      expect($cards.eq(3)).to.contain.text('TRON');
    });
  });

  it('should filter by 1 year change', () => {
    cy.get('.filter-select').select('Change (1 Year)');
    cy.get('.currency-card').find('.currency-item').should('have.length', 4).then(($cards) => {
      expect($cards.eq(0)).to.contain.text('Bitcoin');
      expect($cards.eq(1)).to.contain.text('Ethereum');
      expect($cards.eq(2)).to.contain.text('TRON');
      expect($cards.eq(3)).to.contain.text('Bibox Token');
    });
  });

  it('should filter by rank/market cap (default)', () => {
    cy.get('.filter-select').select('Default (Rank/MarketCap)');
    cy.get('.currency-card').find('.currency-item').should('have.length', 4).then(($cards) => {
      expect($cards.eq(0)).to.contain.text('Bitcoin');
      expect($cards.eq(1)).to.contain.text('Ethereum');
      expect($cards.eq(2)).to.contain.text('TRON');
      expect($cards.eq(3)).to.contain.text('Bibox Token');
    });
  });
});