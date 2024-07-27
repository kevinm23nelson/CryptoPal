// src/components/CurrencyList/CurrencyList.js

import React, { useEffect, useState } from 'react';
import { getCurrencies } from '../../api/apiCalls';
import './CurrencyList.css';

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getCurrencies().then(data => setCurrencies(data));
  }, []);

  return (
    <div className='currency-list-items'>
      {currencies.map(currency => (
        <div key={currency.id} className='currency-list-item'>
          <div>Name: {currency.name}</div>
          <div>Rank: {currency.rank}</div>
          <div>Symbol: {currency.symbol}</div>
          <div>Market Cap (USD): {currency.marketCapUsd}</div>
          <div>Price (USD): {currency.priceUsd}</div>
          <div>Change (24Hr): {currency.changePercent24Hr}%</div>
          {/* Add sixMonthChange data if available */}
        </div>
      ))}
    </div>
  );
};

export default CurrencyList;
