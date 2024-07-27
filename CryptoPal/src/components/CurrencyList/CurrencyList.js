import React, { useState, useEffect } from 'react';
import { getCurrencies } from '../../api/apiCalls';
import './CurrencyList.css';

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [favorites, setFavorites] = useState(new Set()); // To store favorited currency IDs

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    fetchData();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id); // Remove if already favorited
      } else {
        newFavorites.add(id); // Add if not favorited
      }
      return newFavorites;
    });
  };

  return (
    <div className="currency-list-items">
      {currencies.map((currency) => (
        <div className="currency-list-item" key={currency.id}>
          <h2>{currency.name}</h2>
          <p>Rank: {currency.rank}</p>
          <p>Symbol: {currency.symbol}</p>
          <p>Market Cap (USD): ${currency.marketCapUsd}</p>
          <p>Price (USD): ${currency.priceUsd}</p>
          <p>24h Change: {currency.changePercent24Hr}%</p>
          <p>6 Month Change: {currency.sixMonthChange}%</p>
          <button
            className={`favorite-button ${favorites.has(currency.id) ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(currency.id)}
          >
            {favorites.has(currency.id) ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CurrencyList;
