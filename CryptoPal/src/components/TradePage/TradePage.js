// TradePage.js
import React, { useState, useEffect } from 'react';
import { loadFavorites, saveTrade } from '../../utils/localStorage/LocalStorage';
import './TradePage.css';

const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [investments, setInvestments] = useState({});

  useEffect(() => {
    const favs = loadFavorites();
    setFavorites(favs);
  }, []);

  const handleInputChange = (e, currencyId) => {
    setInvestments({
      ...investments,
      [currencyId]: e.target.value,
    });
  };

  const handleBuy = (currency) => {
    const amount = parseFloat(investments[currency.id] || 0);
    if (amount > 0) {
      const investment = {
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        priceUsd: currency.priceUsd,
        amountInvested: amount,
        quantity: amount / parseFloat(currency.priceUsd),
      };
      saveTrade(investment);
      alert(`Bought ${investment.quantity} of ${currency.name}`);
      setInvestments({
        ...investments,
        [currency.id]: '',
      });
    } else {
      alert('Please enter a valid amount to invest.');
    }
  };

  return (
    <div className="trade-page">
      <h1>Trade</h1>
      {favorites.length === 0 ? (
        <p>No favorite currencies available for trading. Go "Favorite" some on the Explore page to start trading!</p>
      ) : (
        favorites.map((currency) => (
          <div key={currency.id} className="trade-card">
            <h2>{currency.name} ({currency.symbol})</h2>
            <p>Rank: {currency.rank}</p>
            <p>Price: ${parseFloat(currency.priceUsd).toFixed(2)}</p>
            <label>
              Amount to Invest:
              <input
                type="number"
                value={investments[currency.id] || ''}
                onChange={(e) => handleInputChange(e, currency.id)}
              />
            </label>
            <p>Quantity: {(investments[currency.id] / parseFloat(currency.priceUsd) || 0).toFixed(6)}</p>
            <button onClick={() => handleBuy(currency)}>Buy</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TradePage;
