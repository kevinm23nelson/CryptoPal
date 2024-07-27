import React from 'react'

const CurrencyCard = ({ favorites }) => {
  return (
    <div className="currency-card">
      <div className="currency-card-header">
        <h2>Favorite Currencies</h2>
      </div>
      <div className="currency-card-body">
        {favorites.length > 0 ? (
          favorites.map((currency) => (
            <div key={currency.id} className="currency-item">
              <p>Name: {currency.name}</p>
              <p>Rank: {currency.rank}</p>
              <p>Symbol: {currency.symbol}</p>
              <p>Market Cap USD: {currency.marketCapUsd}</p>
              <p>Price USD: {currency.priceUsd}</p>
              <p>Change (24hr): {currency.changePercent24Hr}</p>
              <p>Change (6 Months): {currency.sixMonthChange}</p>
            </div>
          ))
        ) : (
          <p>No favorites selected.</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyCard