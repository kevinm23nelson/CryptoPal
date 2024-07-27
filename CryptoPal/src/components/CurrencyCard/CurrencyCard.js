import React from 'react';
import PropTypes from 'prop-types';
import './CurrencyCard.css';

const CurrencyCard = ({ favorites = [] }) => {
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
            </div>
          ))
        ) : (
          <p>No favorites selected.</p>
        )}
      </div>
    </div>
  );
};

CurrencyCard.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      marketCapUsd: PropTypes.string.isRequired,
      priceUsd: PropTypes.string.isRequired,
      changePercent24Hr: PropTypes.string.isRequired,
    })
  ),
};

CurrencyCard.defaultProps = {
  favorites: [],
};

export default CurrencyCard;
