import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCurrencies } from '../../utils/api/apiCalls';
import arrowUp from '../../images/elevator-arrow-up.webp';
import icons from '../../images/icons';
import { getIconForCurrency } from '../../utils/utils'; // Import the utility function
import './CurrencyList.css';

const CurrencyList = ({ searchQuery, favorites, toggleFavorite }) => {
  const [currencies, setCurrencies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setErrorMessage('Failed to fetch currencies. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery && filteredCurrencies.length === 0) {
      setErrorMessage('Your search did not yield any results.');
    } else {
      setErrorMessage('');
    }
  }, [searchQuery, filteredCurrencies]);

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleViewDetails = (id) => {
    navigate(`/currency/${id}`);
  };

  return (
    <div className="currency-list">
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        filteredCurrencies.map((currency) => (
          <div
            key={currency.id}
            className={`currency-list-item ${parseFloat(currency.changePercent24Hr) >= 0 ? 'positive' : 'negative'}`}
          >
            <div className="currency-list-header">
              <img
                src={arrowUp}
                alt="Performance arrow"
                className={`performance-arrow ${parseFloat(currency.changePercent24Hr) < 0 ? 'flipped' : ''}`}
              />
              <p>{currency.name} ({currency.symbol})</p>
              <img
                src={getIconForCurrency(currency.symbol, icons)} // Use the utility function
                alt={`${currency.symbol} icon`}
                className="currency-icon"
              />
            </div>
            <div className="explore-currency-details">
              <p>Rank: {currency.rank}</p>
              <p>Price: {formatPrice(currency.priceUsd)}</p>
              <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
            </div>
            <div className="currency-list-button-container">
              <button
                className={`currency-list-favorite-button ${favorites.find((fav) => fav.id === currency.id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(currency)}
              >
                {favorites.find((fav) => fav.id === currency.id) ? 'Unfavorite' : 'Favorite'}
              </button>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(currency.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

CurrencyList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default CurrencyList;
