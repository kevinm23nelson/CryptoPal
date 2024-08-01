import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCurrencyById } from '../../api/apiCalls';
import './CurrencyDetailsPage.css';

const CurrencyDetailsPage = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      try {
        const data = await getCurrencyById(id);
        setCurrency(data);
      } catch (error) {
        console.error('Error fetching currency details:', error);
        setErrorMessage('Failed to fetch currency details. Please try again later.');
      }
    };

    fetchCurrencyDetails();
  }, [id]);

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const performanceClass = parseFloat(currency?.changePercent24Hr) >= 0 ? 'positive-performance' : 'negative-performance';

  return (
    <div className="currency-details-page">
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : currency ? (
        <div className="currency-view-details">
          <div className={`currency-header ${performanceClass}`}>
            <p>Coin: {currency.name}</p>
            <p className="currency-symbol">Symbol: {currency.symbol}</p>
          </div>
          <div className="currency-details-body">
            <p>Rank: {currency.rank}</p>
            <p>Supply: {currency.supply}</p>
            <p>Max Supply: {currency.maxSupply}</p>
            <p>Market Cap USD: {formatPrice(currency.marketCapUsd)}</p>
            <p>Volume USD (24Hr): {formatPrice(currency.volumeUsd24Hr)}</p>
            <p>Price USD: {formatPrice(currency.priceUsd)}</p>
            <p>Change (24hr): {parseFloat(currency.changePercent24Hr).toFixed(2)}%</p>
            <p>VWAP (24Hr): {formatPrice(currency.vwap24Hr)}</p>
            <button
              className="return-button"
              onClick={() => navigate(location.state?.from === 'dashboard' ? '/' : '/explore')}
            >
              Return to {location.state?.from === 'dashboard' ? 'Dashboard' : 'Explore'}
            </button>
          </div>
        </div>
      ) : (
        <p className="loading-message-details-page">Loading...</p>
      )}
    </div>
  );
};

export default CurrencyDetailsPage;
