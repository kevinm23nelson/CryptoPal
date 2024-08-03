import React, { useState, useEffect } from 'react';
import { loadFavorites, saveTrade, loadTrades } from '../../utils/localStorage/LocalStorage';
import Filter from '../Filter/Filter';
import './TradePage.css';

const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [investments, setInvestments] = useState({});
  const [sellAmounts, setSellAmounts] = useState({});
  const [ownedQuantities, setOwnedQuantities] = useState({});
  const [filter, setFilter] = useState('rank');

  useEffect(() => {
    const favs = loadFavorites();
    setFavorites(favs);
    calculateOwnedQuantities();
  }, []);

  const calculateOwnedQuantities = () => {
    const trades = loadTrades();
    const quantities = {};
    
    trades.forEach((trade) => {
      if (!quantities[trade.id]) {
        quantities[trade.id] = { quantity: 0, priceUsd: trade.priceUsd }; // Store priceUsd along with quantity
      }
      quantities[trade.id].quantity += trade.quantity;
      quantities[trade.id].priceUsd = trade.priceUsd; // Update priceUsd with the latest price
    });
    
    setOwnedQuantities(quantities);
  };

  const handleInputChange = (e, currencyId) => {
    setInvestments({
      ...investments,
      [currencyId]: e.target.value,
    });
  };

  const handleSellInputChange = (e, currencyId) => {
    setSellAmounts({
      ...sellAmounts,
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
        type: 'buy',
      };
      saveTrade(investment);
      alert(`Bought ${investment.quantity} of ${currency.name}`);
      setInvestments({
        ...investments,
        [currency.id]: '',
      });
      calculateOwnedQuantities();
    } else {
      alert('Please enter a valid amount to invest.');
    }
  };

  const handleSell = (currency) => {
    const quantityToSell = parseFloat(sellAmounts[currency.id] || 0);
    const owned = ownedQuantities[currency.id] || { quantity: 0, priceUsd: currency.priceUsd };
    const ownedQuantity = owned.quantity;

    if (quantityToSell > 0 && quantityToSell <= ownedQuantity) {
      const amount = quantityToSell * parseFloat(currency.priceUsd);
      const investment = {
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        priceUsd: currency.priceUsd,
        amountInvested: -amount, // Negative amount to indicate sell
        quantity: -quantityToSell, // Negative quantity to indicate sell
        type: 'sell',
      };
      saveTrade(investment);
      alert(`Sold ${Math.abs(investment.quantity)} of ${currency.name}`);
      setSellAmounts({
        ...sellAmounts,
        [currency.id]: '',
      });
      calculateOwnedQuantities();
    } else {
      alert('Please enter a valid quantity to sell or check if you have enough quantity.');
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredFavorites = () => {
    const sortedFavorites = [...favorites];
    switch (filter) {
      case '24hrpositive':
        sortedFavorites.sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr));
        break;
      case '24hrnegative':
        sortedFavorites.sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr));
        break;
      case 'rank':
      default:
        sortedFavorites.sort((a, b) => a.rank - b.rank);
        break;
    }
    return sortedFavorites;
  };

  return (
    <div className="trade-page">
      <h1 className="trade-page-header">Trade Your Favorite Currencies</h1>
      <div className="filter-container">
        <Filter onFilterChange={handleFilterChange} includeOneYear={false} />
      </div>
      {favorites.length === 0 ? (
        <p>No favorite currencies available for trading. Go "Favorite" some on the Explore page to start trading!</p>
      ) : (
        getFilteredFavorites().map((currency) => {
          const owned = ownedQuantities[currency.id] || { quantity: 0, priceUsd: currency.priceUsd };
          const ownedQuantity = owned.quantity;
          const ownedValueInUsd = ownedQuantity * parseFloat(currency.priceUsd);

          return (
            <div key={currency.id} className="trade-card">
              <h2>{currency.name} ({currency.symbol})</h2>
              <div className="currency-info">
                <p>Rank: {currency.rank}</p>
                <p>Price: ${parseFloat(currency.priceUsd).toFixed(2)}</p>
                <p>24 Hr Change: {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
              </div>
              <label>
                Amount to Invest in USD ($):
                <input
                  type="number"
                  value={investments[currency.id] || ''}
                  onChange={(e) => handleInputChange(e, currency.id)}
                />
              </label>
              <p>Quantity of Coin you will purchase: {(investments[currency.id] / parseFloat(currency.priceUsd) || 0).toFixed(6)}</p>
              <button onClick={() => handleBuy(currency)}>Buy</button>
              <div className="currency-info-two">
                <p>Owned Quantity of this Coin: {ownedQuantity.toFixed(6)}</p>
                <p>Owned Quantity of this Coin in USD: ${ownedValueInUsd.toFixed(2)}</p>
              </div>
              <label>
                Quantity of Coin to Sell:
                <input
                  type="number"
                  value={sellAmounts[currency.id] || ''}
                  onChange={(e) => handleSellInputChange(e, currency.id)}
                />
              </label>
              <p>Quantity of USD ($) you will receive: ${(parseFloat(sellAmounts[currency.id] || 0) * parseFloat(currency.priceUsd)).toFixed(2)}</p>
              <button onClick={() => handleSell(currency)}>Sell</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TradePage;
