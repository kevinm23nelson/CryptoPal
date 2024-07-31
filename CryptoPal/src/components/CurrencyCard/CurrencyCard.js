import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getHistoricalData } from '../../api/apiCalls';
import './CurrencyCard.css';

// Function to calculate one year performance
export const calculateOneYearPerformance = (historicalData) => {
  if (historicalData.length === 0) return { percentageChange: 0 };

  // Calculate one year ago date
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  console.log('One year ago date:', oneYearAgo);

  // Filter data points within the last year
  const recentData = historicalData.filter(dataPoint => new Date(dataPoint.time) >= oneYearAgo);

  console.log('Filtered recent data:', recentData);

  // Early return if there isn't enough data
  if (recentData.length < 2) {
    console.log('Not enough data to calculate performance');
    return { percentageChange: 0 };
  }

  // Find the earliest and latest data points in the filtered data
  const earliestData = recentData[0];
  const latestData = recentData[recentData.length - 1];

  console.log('Earliest data point:', earliestData);
  console.log('Latest data point:', latestData);

  // Calculate percentage change
  const percentageChange = ((latestData.priceUsd - earliestData.priceUsd) / earliestData.priceUsd) * 100;

  console.log('Percentage change:', percentageChange);

  return { percentageChange: percentageChange.toFixed(2) };
};
;

const CurrencyCard = ({ favorites = [], onRemoveFavorite }) => {
  const navigate = useNavigate();
  const [oneYearChanges, setOneYearChanges] = useState({});

  useEffect(() => {
    const fetchOneYearChanges = async () => {
      const changes = {};

      // Fetch historical data for all currencies in parallel
      const historicalDataPromises = favorites.map(async (currency) => {
        const historicalData = await getHistoricalData(currency.id);
        const oneYearPerformance = calculateOneYearPerformance(historicalData);
        return { id: currency.id, oneYearPerformance };
      });

      try {
        // Resolve all promises
        const results = await Promise.all(historicalDataPromises);
        // Map results to the state
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
                <p>Symbol: {currency.symbol}</p>
              </div>
              <div className="currency-details">
                <p>Rank: {currency.rank}</p>
                <p>Market Cap USD: {formatPrice(currency.marketCapUsd)}</p>
                <p>Price USD: {formatPrice(currency.priceUsd)}</p>
                <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
                <p>Change (1 year): {oneYearChanges[currency.id] || 'Loading...'}%</p>
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
