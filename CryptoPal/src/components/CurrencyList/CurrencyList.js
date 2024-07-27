import React, { useState, useEffect } from 'react';
import { getCurrencies } from '../../api/apiCalls';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import './CurrencyList.css';

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
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

  return (
    <div>
      <div className="currency-list-items">
        {currencies.map((currency) => (
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
        ))}
      </div>
      <CurrencyCard favorites={favorites} />
    </div>
  );
};

export default CurrencyList;
