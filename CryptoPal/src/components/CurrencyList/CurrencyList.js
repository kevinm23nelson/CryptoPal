import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrencies } from '../../api/apiCalls';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import './CurrencyList.css';

const CurrencyList = ({ searchQuery }) => {
  const [currencies, setCurrencies] = useState([]);
  const [favorites, setFavorites] = useState([]);
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

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (currency) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.id === currency.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== currency.id);
    } else {
      updatedFavorites = [...favorites, currency];
    }
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

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

  return (
    <div>
      <div className="currency-list-items">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          filteredCurrencies.map((currency) => (
            <div key={currency.id} className="currency-list-item">
              <p>Name: {currency.name}</p>
              <p>Rank: {currency.rank}</p>
              <p>Symbol: {currency.symbol}</p>
              <p>Market Cap USD: {currency.marketCapUsd}</p>
              <p>Price USD: {currency.priceUsd}</p>
              <p>Change (24hr): {currency.changePercent24Hr}</p>
              <p>Change (6 Months): {currency.sixMonthChange}</p>
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
    </div>
  );
};

CurrencyList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default CurrencyList;
