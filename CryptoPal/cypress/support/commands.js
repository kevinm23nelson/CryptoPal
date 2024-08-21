Cypress.Commands.add('setupCurrencyIntercepts', () => {
    cy.intercept('GET', 'https://api.coincap.io/v2/assets', {
        statusCode: 200,
        fixture: 'CurrencyList.json'
    }).as('getCurrencies');


    
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/bitcoin', {
        statusCode: 200,
        fixture: 'bitcoin.json'
    }).as('getCurrencyById');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/ethereum', {
        statusCode: 200,
        fixture: 'ethereum.json'
    }).as('getCurrencyById');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/bibox-token', {
        statusCode: 200,
        fixture: 'bibox-token.json'
    }).as('getCurrencyById');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/tron', {
        statusCode: 200,
        fixture: 'tron.json'
    }).as('getCurrencyById');


    
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/bitcoin/history?interval=d1', {
        statusCode: 200,
        fixture: 'history-bitcoin.json'
    }).as('getHistoricalData');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/ethereum/history?interval=d1', {
        statusCode: 200,
        fixture: 'history-ethereum.json'
    }).as('getHistoricalData');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/bibox-token/history?interval=d1', {
        statusCode: 200,
        fixture: 'history-bibox-token.json'
    }).as('getHistoricalData');

    cy.intercept('GET', 'https://api.coincap.io/v2/assets/tron/history?interval=d1', {
        statusCode: 200,
        fixture: 'history-tron.json'
    }).as('getHistoricalData');
});

