import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadTrades } from '../../utils/localStorage/LocalStorage';
import { getCurrencyById } from '../../utils/api/apiCalls';
import './AssetsPage.css';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrices = async () => {
      const trades = loadTrades();
      const assetIds = [...new Set(trades.map(trade => trade.id))];

      const prices = await Promise.all(assetIds.map(async (id) => {
        const data = await getCurrencyById(id);
        return { id, priceUsd: parseFloat(data.priceUsd) };
      }));

      const pricesMap = prices.reduce((acc, { id, priceUsd }) => {
        acc[id] = priceUsd;
        return acc;
      }, {});

      setCurrentPrices(pricesMap);

      const groupedAssets = trades.reduce((acc, trade) => {
        const existingAsset = acc.find(asset => asset.id === trade.id);
        if (existingAsset) {
          existingAsset.amountInvested += trade.amountInvested;
          existingAsset.quantity += trade.quantity;
        } else {
          acc.push({ ...trade });
        }
        return acc;
      }, []);

      // Sort assets based on their current value
      groupedAssets.sort((a, b) => {
        const aCurrentValue = a.quantity * (pricesMap[a.id] || 0);
        const bCurrentValue = b.quantity * (pricesMap[b.id] || 0);
        return bCurrentValue - aCurrentValue;
      });

      setAssets(groupedAssets);
    };

    fetchPrices();
  }, []);

  const handleViewTransactions = (id) => {
    navigate(`/assets-past-transactions/${id}`);
  };

  const calculatePerformance = (id) => {
    const asset = assets.find(a => a.id === id);
    if (!asset || !currentPrices[id]) return 0;

    const currentValue = asset.quantity * currentPrices[id];
    const change = currentValue - asset.amountInvested;
    return change;
  };

  const calculateTotalInvestment = () => {
    return assets.reduce((total, asset) => total + asset.amountInvested, 0);
  };

  const calculateTotalAssetValue = () => {
    return assets.reduce((total, asset) => {
      const currentValue = asset.quantity * (currentPrices[asset.id] || 0);
      return total + currentValue;
    }, 0);
  };

  const calculateTotalPerformance = () => {
    const totalInvestment = calculateTotalInvestment();
    const totalAssetValue = calculateTotalAssetValue();
    const performance = ((totalAssetValue - totalInvestment) / totalInvestment) * 100;
    return performance.toFixed(2);
  };

  const totalInvestment = calculateTotalInvestment().toFixed(2);
  const totalAssetValue = calculateTotalAssetValue().toFixed(2);
  const totalPerformance = calculateTotalPerformance();
  const totalGainLoss = (totalAssetValue - totalInvestment).toFixed(2);

  return (
    <div className="assets-page">
      <h1 className="assets-page-header">My Assets</h1>
      <div className="total-portfolio-performance">
        <h2>Total Portfolio Performance</h2>
        <p>Total Investment: ${totalInvestment}</p>
        <p>Total Asset Value: ${totalAssetValue}</p>
        <p>
          Total Gain/Loss:{" "}
          <span style={{ color: totalGainLoss >= 0 ? "green" : "red" }}>
            {totalGainLoss >= 0 ? "+" : "-"}${Math.abs(totalGainLoss)}
          </span>
        </p>
        <p>Percentage Change: {totalPerformance}%</p>
      </div>
      <h1 className="assets-page-description">
        Coins you own. Ranked by current value.
      </h1>
      {assets.length === 0 ? (
        <p>No assets purchased yet.</p>
      ) : (
        assets.map((asset) => (
          <div key={asset.id} className="asset-card">
            <h2>{asset.name} ({asset.symbol})</h2>
            <div className="asset-info">
              <p>Total Amount Invested: ${asset.amountInvested.toFixed(2)}</p>
              <p>Quantity of Currency you Own: {asset.quantity.toFixed(6)}</p>
              <p>Current Value: ${(
                asset.quantity * (currentPrices[asset.id] || 0)
              ).toFixed(2)}</p>
              <p>Performance: ${calculatePerformance(asset.id).toFixed(2)}</p>
            </div>
            <button className="asset-page-view-details-button" onClick={() => handleViewTransactions(asset.id)}>View Transactions</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AssetsPage;
