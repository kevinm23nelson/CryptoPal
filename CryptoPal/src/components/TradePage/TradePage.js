import React, { useState, useEffect } from 'react';
import { loadFavorites, saveTrade, loadTrades } from '../../utils/localStorage/LocalStorage';
import { getCurrencies } from '../../utils/api/apiCalls';
import Filter from '../Filter/Filter';
import './TradePage.css';

const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [investments, setInvestments] = useState({});
  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState('rank');

  useEffect(() => {
    const fetchData = async () => {
      const favs = loadFavorites();
      setFavorites(favs);
      const loadedTrades = loadTrades();
      setTrades(loadedTrades);

      try {
        const latestPrices = await getCurrencies();
        const updatedFavorites = favs.map((fav) => {
          const latestPrice = latestPrices.find((price) => price.id === fav.id);
          return {
            ...fav,
            priceUsd: latestPrice ? latestPrice.priceUsd : fav.priceUsd,
          };
        });
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Failed to fetch currencies:", error);
      }
    };

    fetchData();
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
      setTrades([...trades, investment]);
    } else {
      alert('Please enter a valid amount to invest.');
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

  const calculateOwnedQuantityAndValue = (currencyId) => {
    const ownedTrades = trades.filter(trade => trade.id === currencyId);
    const ownedQuantity = ownedTrades.reduce((total, trade) => total + trade.quantity, 0);
    const currency = favorites.find(currency => currency.id === currencyId);
    const ownedValueInUsd = ownedQuantity * (currency ? parseFloat(currency.priceUsd) : 0);
    return { ownedQuantity, ownedValueInUsd };
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
          const { ownedQuantity, ownedValueInUsd } = calculateOwnedQuantityAndValue(currency.id);
          return (
            <div key={currency.id} className="trade-card">
              <h2>{currency.name} ({currency.symbol})</h2>
              <div className="currency-info">
                <p>Rank: {currency.rank}</p>
                <p>Price: ${parseFloat(currency.priceUsd).toFixed(2)}</p>
                <p>24 Hr Change: {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
              </div>
              <div className="currency-info-two">
                <p>Owned Quantity of this Coin: {ownedQuantity.toFixed(6)}</p>
                <p>Owned Quantity of this Coin in USD: ${ownedValueInUsd.toFixed(2)}</p>
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
            </div>
          );
        })
      )}
    </div>
  );
};

export default TradePage;
