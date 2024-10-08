import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getHistoricalData } from '../../utils/api/apiCalls';
import './CurrencyCard.css';
import arrowUp from '../../images/elevator-arrow-up.webp';
import icons from '../../images/icons'; // Import the icons object

export const calculateOneYearPerformance = (historicalData) => {
  if (historicalData.length === 0) {
    return { percentageChange: 0 };
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const recentData = historicalData.filter(dataPoint => {
    const dataDate = new Date(dataPoint.time);
    return dataDate >= oneYearAgo;
  });

  if (recentData.length < 2) {
    return { percentageChange: 0 };
  }

  const earliestData = recentData[0];
  const latestData = recentData[recentData.length - 1];

  const percentageChange = ((latestData.priceUsd - earliestData.priceUsd) / earliestData.priceUsd) * 100;

  return { percentageChange: percentageChange.toFixed(2) };
};

const CurrencyCard = ({ favorites = [], onRemoveFavorite, loading }) => {
  const navigate = useNavigate();
  const [oneYearChanges, setOneYearChanges] = useState({});

  useEffect(() => {
    const fetchOneYearChanges = async () => {
      const changes = {};

      const historicalDataPromises = favorites.map(async (currency) => {
        try {
          const historicalData = await getHistoricalData(currency.id);
          const oneYearPerformance = calculateOneYearPerformance(historicalData);
          return { id: currency.id, oneYearPerformance };
        } catch (error) {
          console.error(`Error fetching historical data for ${currency.id}:`, error);
          return { id: currency.id, oneYearPerformance: { percentageChange: 0 } };
        }
      });

      try {
        const results = await Promise.all(historicalDataPromises);
        results.forEach(({ id, oneYearPerformance }) => {
          changes[id] = oneYearPerformance.percentageChange;
        });
        setOneYearChanges(changes);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchOneYearChanges();
  }, [favorites]);

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
      <div className="currency-card-body">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : favorites.length > 0 ? (
          favorites.map((currency) => (
            <div
              key={currency.id}
              className={`currency-item ${parseFloat(currency.changePercent24Hr) >= 0 ? 'positive' : 'negative'}`}
            >
              <div className="currency-header">
                <img
                  src={arrowUp}
                  alt="Performance arrow"
                  className={`performance-arrow ${parseFloat(currency.changePercent24Hr) < 0 ? 'flipped' : ''}`}
                />
                <p>{currency.name} ({currency.symbol})</p>
                <img
                  src={icons[currency.symbol.toLowerCase()]}
                  alt={`${currency.symbol} icon`}
                  className="currency-icon"
                />
              </div>
              <div className="currency-card-details">
                <p className="currency-rank">Rank: {currency.rank}</p>
                <p className="currency-market-cap">Market Cap: {formatPrice(currency.marketCapUsd)}</p>
                <p className="currency-price">Price: {formatPrice(currency.priceUsd)}</p>
                <p className="currency-change">Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
                <p className="currency-year-change">Change (1 year): {oneYearChanges[currency.id] || 'Loading...'}%</p>
              </div>
              <div className="currency-card-button-container">
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
          <p className="no-favorites-message">No favorites selected. Go to the "Explore" page!</p>
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
      priceUsd: PropTypes.string.isRequired,
      changePercent24Hr: PropTypes.string.isRequired,
      marketCapUsd: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CurrencyCard;
