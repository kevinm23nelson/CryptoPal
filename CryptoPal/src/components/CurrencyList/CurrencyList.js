import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrencies } from '../../api/apiCalls';
import './CurrencyList.css';

const CurrencyList = ({ searchQuery, favorites, toggleFavorite }) => {
  const [currencies, setCurrencies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="currency-list">
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        filteredCurrencies.map((currency) => (
          <div key={currency.id} className="currency-list-item">
            <p>Name: {currency.name}</p>
            <p>Rank: {currency.rank}</p>
            <p>Symbol: {currency.symbol}</p>
            <p>Market Cap USD: {formatPrice(currency.marketCapUsd)}</p>
            <p>Price USD: {formatPrice(currency.priceUsd)}</p>
            <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
            <button
              className={`favorite-button ${
                favorites.find((fav) => fav.id === currency.id) ? 'favorited' : ''
              }`}
              onClick={() => toggleFavorite(currency)}
            >
              {favorites.find((fav) => fav.id === currency.id) ? 'Unfavorite' : 'Favorite'}
            </button>
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
      name: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      marketCapUsd: PropTypes.string.isRequired,
      priceUsd: PropTypes.string.isRequired,
      changePercent24Hr: PropTypes.string.isRequired,
      sixMonthChange: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default CurrencyList;
