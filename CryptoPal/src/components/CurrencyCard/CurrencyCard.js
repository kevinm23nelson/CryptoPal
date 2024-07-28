import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CurrencyCard.css';

const CurrencyCard = ({ favorites = [], onRemoveFavorite }) => {
  const [removingId, setRemovingId] = useState(null);

  const handleRemoveFavorite = (currencyId) => {
    setRemovingId(currencyId);
    setTimeout(() => {
      onRemoveFavorite(currencyId);
      setRemovingId(null);
    }, 300); // Match this duration to the CSS transition duration
  };

  return (
    <div className="currency-card">
      <div className="currency-card-header">
        <h2>Favorite Currencies</h2>
      </div>
      <div className="currency-card-body">
        {favorites.length > 0 ? (
          favorites.map((currency) => (
            <div
              key={currency.id}
              className={`currency-item ${removingId === currency.id ? 'removing' : ''}`}
            >
              <p>Name: {currency.name}</p>
              <p>Rank: {currency.rank}</p>
              <p>Symbol: {currency.symbol}</p>
              <p>Market Cap USD: {currency.marketCapUsd}</p>
              <p>Price USD: {currency.priceUsd}</p>
              <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
              <button
                onClick={() => handleRemoveFavorite(currency.id)}
                className="remove-favorite-button"
              >
                Remove Favorite2
              </button>
            </div>
          ))
        ) : (
          <p>No favorites selected. Go to the "Explore" page!</p>
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
  onRemoveFavorite: PropTypes.func.isRequired,
};

CurrencyCard.defaultProps = {
  favorites: [],
};

export default CurrencyCard;
