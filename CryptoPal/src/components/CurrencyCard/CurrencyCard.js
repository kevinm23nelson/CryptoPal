import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getHistoricalData } from '../../api/apiCalls';
import './CurrencyCard.css';

export const calculateOneYearPerformance = (historicalData) => {
  console.log('Calculating one year performance for historical data:', historicalData);

  if (historicalData.length === 0) {
    console.log('No historical data available.');
    return { percentageChange: 0 };
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  console.log('One year ago date:', oneYearAgo);

  const recentData = historicalData.filter(dataPoint => new Date(dataPoint.time) >= oneYearAgo);
  console.log('Filtered recent data:', recentData);

  if (recentData.length < 2) {
    console.log('Not enough data points for one year performance calculation.');
    return { percentageChange: 0 };
  }

  const earliestData = recentData[0];
  const latestData = recentData[recentData.length - 1];
  console.log('Earliest data point:', earliestData);
  console.log('Latest data point:', latestData);

  const percentageChange = ((latestData.priceUsd - earliestData.priceUsd) / earliestData.priceUsd) * 100;
  console.log('Calculated percentage change:', percentageChange.toFixed(2));

  return { percentageChange: percentageChange.toFixed(2) };
};

const CurrencyCard = ({ favorites = [], onRemoveFavorite, loading }) => {
  const navigate = useNavigate();
  const [oneYearChanges, setOneYearChanges] = useState({});

  useEffect(() => {
    const fetchOneYearChanges = async () => {
      const changes = {};

      const historicalDataPromises = favorites.map(async (currency) => {
        const historicalData = await getHistoricalData(currency.id);
        const oneYearPerformance = calculateOneYearPerformance(historicalData);
        return { id: currency.id, oneYearPerformance };
      });

      try {
        const results = await Promise.all(historicalDataPromises);
        results.forEach(({ id, oneYearPerformance }) => {
          changes[id] = oneYearPerformance.percentageChange;
        });
        setOneYearChanges(changes);
        console.log('One year changes:', changes);
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
        {loading ? (
          <p className="loading-message">Loading...</p> // Display loading message
        ) : favorites.length > 0 ? (
          favorites.map((currency) => (
            <div
              key={currency.id}
              className={`currency-item ${
                parseFloat(currency.changePercent24Hr) >= 0 ? 'positive' : 'negative'
              }`}
            >
              <div className="currency-header">
                <p>Coin: {currency.name}</p>
                <p className="currency-symbol">Symbol: {currency.symbol}</p>
              </div>
              <div className="currency-details">
                <p className="currency-rank">Rank: {currency.rank}</p>
                <p className="currency-market-cap">Market Cap: {formatPrice(currency.marketCapUsd)}</p>
                <p className="currency-price">Price: {formatPrice(currency.priceUsd)}</p>
                <p className="currency-change">Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
                <p className="currency-year-change">Change (1 year): {oneYearChanges[currency.id] || 'Loading...'}%</p>
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
      rank: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      priceUsd: PropTypes.string.isRequired,
      changePercent24Hr: PropTypes.string.isRequired,
      marketCapUsd: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired, // PropType for loading
};

export default CurrencyCard;
