Cypress.Commands.add('setupCurrencyIntercepts', () => {
    // Intercept the request to get all currencies
    cy.intercept('GET', 'https://api.coincap.io/v2/assets', {
      statusCode: 200,
      fixture: 'favoriteCurrencies.json'
    }).as('getCurrencies');
  
    // Intercept requests for individual currency by ID
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/bitcoin', {
      statusCode: 200,
      fixture: 'bitcoin.json'
    }).as('getCurrencyById');
  
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/ethereum', {
      statusCode: 200,
      fixture: 'ethereum.json'
    }).as('getCurrencyById');
  
  });
  