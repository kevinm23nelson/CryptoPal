Cypress.Commands.add('setupCurrencyIntercepts', () => {
    console.log('Setting up intercepts');
    
    cy.intercept('GET', 'https://api.coincap.io/v2/assets', {
      statusCode: 200,
      fixture: 'DashboardCurrencies.json'
    }).as('getCurrencies');
  
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/*', (req) => {
      const id = req.url.split('/').pop();
      req.reply({ statusCode: 200, fixture: `CurrencyDetails_${id}.json` });
    }).as('getCurrencyById');
  
    cy.intercept('GET', 'https://api.coincap.io/v2/assets/*/history?interval=d1', (req) => {
      const id = req.url.split('/')[4];
      req.reply({ statusCode: 200, fixture: `HistoricalData_${id}.json` });
    }).as('getHistoricalData');
  });
  