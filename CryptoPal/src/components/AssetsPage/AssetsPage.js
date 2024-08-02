// AssetsPage.js
import React, { useState, useEffect } from 'react';
import { loadTrades } from '../../utils/localStorage/LocalStorage';
import { getCurrencyById } from '../../utils/api/apiCalls'; // Assuming you have an API call to get the latest currency data
import './AssetsPage.css';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [detailedView, setDetailedView] = useState(null);

  useEffect(() => {
    const trades = loadTrades();
    const aggregatedAssets = trades.reduce((acc, trade) => {
      if (!acc[trade.id]) {
        acc[trade.id] = { ...trade, totalInvested: 0, totalQuantity: 0, transactions: [] };
      }
      acc[trade.id].totalInvested += trade.amountInvested;
      acc[trade.id].totalQuantity += trade.quantity;
      acc[trade.id].transactions.push(trade);
      return acc;
    }, {});
    setAssets(Object.values(aggregatedAssets));
  }, []);

  const handleViewTransactions = (assetId) => {
    setDetailedView(assets.find(asset => asset.id === assetId));
  };

  const handleCloseDetails = () => {
    setDetailedView(null);
  };

  return (
    <div className="assets-page">
      <h1>My Assets</h1>
      {assets.length === 0 ? (
        <p>No assets purchased yet.</p>
      ) : (
        assets.map((asset) => (
          <div key={asset.id} className="asset-card">
            <h2>{asset.name} ({asset.symbol})</h2>
            <p>Amount Invested: ${asset.totalInvested.toFixed(2)}</p>
            <p>Quantity: {asset.totalQuantity.toFixed(6)}</p>
            <p>Current Value: ${(asset.totalQuantity * parseFloat(asset.priceUsd)).toFixed(2)}</p>
            <button className="view-details-button" onClick={() => handleViewTransactions(asset.id)}>View Transactions</button>
          </div>
        ))
      )}
      {detailedView && <DetailedView asset={detailedView} onClose={handleCloseDetails} />}
    </div>
  );
};

const DetailedView = ({ asset, onClose }) => {
  const [currentPrice, setCurrentPrice] = useState(asset.priceUsd);

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      const data = await getCurrencyById(asset.id);
      setCurrentPrice(data.priceUsd);
    };
    fetchCurrentPrice();
  }, [asset.id]);

  return (
    <div className="detailed-view">
      <h2>{asset.name} ({asset.symbol}) Transactions</h2>
      <button className="close-details-button" onClick={onClose}>Close</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount Invested</th>
            <th>Quantity</th>
            <th>Current Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {asset.transactions.map((transaction, index) => {
            const currentValue = transaction.quantity * parseFloat(currentPrice);
            const change = currentValue - transaction.amountInvested;
            return (
              <tr key={index}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>${transaction.amountInvested.toFixed(2)}</td>
                <td>{transaction.quantity.toFixed(6)}</td>
                <td>${currentValue.toFixed(2)}</td>
                <td style={{ color: change >= 0 ? 'green' : 'red' }}>
                  ${change.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsPage;
