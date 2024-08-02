// AssetsPage.js
import React, { useState, useEffect } from 'react';
import { loadTrades } from '../../utils/localStorage/LocalStorage';
import './AssetsPage.css';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const trades = loadTrades();
    setAssets(trades);
  }, []);

  return (
    <div className="assets-page">
      <h1>My Assets</h1>
      {assets.length === 0 ? (
        <p>No assets purchased yet.</p>
      ) : (
        assets.map((asset) => (
          <div key={asset.id} className="asset-card">
            <h2>{asset.name} ({asset.symbol})</h2>
            <p>Amount Invested: ${asset.amountInvested.toFixed(2)}</p>
            <p>Quantity: {asset.quantity.toFixed(6)}</p>
            <p>Current Value: ${(asset.quantity * parseFloat(asset.priceUsd)).toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AssetsPage;
