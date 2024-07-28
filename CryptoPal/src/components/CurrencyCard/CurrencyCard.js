import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CurrencyCard.css';

const CurrencyCard = ({ favorites = [], onRemoveFavorite }) => {
  const navigate = useNavigate();

  const handleRemoveFavorite = (currencyId) => {
    onRemoveFavorite(currencyId);
  };

  const handleViewDetails = (currencyId) => {
    navigate(`/currency/${currencyId}`, { state: { from: 'dashboard' } });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
              className={`currency-item ${
                parseFloat(currency.changePercent24Hr) >= 0 ? 'positive' : 'negative'
              }`}
            >
              <div className="currency-header">
                <p>Coin: {currency.name}</p>
                <p> Symbol: {currency.symbol}</p>
              </div>
              <div className="currency-details">
                <p>Rank: {currency.rank}</p>
                <p>Market Cap USD: {formatPrice(currency.marketCapUsd)}</p>
                <p>Price USD: {formatPrice(currency.priceUsd)}</p>
                <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
              </div>
              <div className="button-container">
                <button
                  onClick={() => handleRemoveFavorite(currency.id)}
                  className="favorite-button"
                >
                  Remove Favorite
                </button>
                <button
                  onClick={() => handleViewDetails(currency.id)}
                  className="dashboard-view-details-button"
                >
                  View Details
                </button>
              </div>
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
      rank: PropTypes.string.isRequired,
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
