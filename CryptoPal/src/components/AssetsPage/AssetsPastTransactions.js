import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadTrades } from '../../utils/localStorage/LocalStorage';
import { getCurrencyById } from '../../utils/api/apiCalls';
import moment from 'moment';
import './AssetsPastTransactions.css';

const AssetsPastTransactions = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        const trades = loadTrades().filter(trade => trade.id === id);
        console.log("Loaded Trades:", trades); // Log trades data
        if (trades.length > 0) {
            const assetData = {
                ...trades[0],
                transactions: trades,
            };
            setAsset(assetData);
            fetchCurrentPrice();
        } else {
            console.error("No trades found for this asset ID:", id);
        }
    }, [id]);

    const fetchCurrentPrice = async () => {
        try {
            const data = await getCurrencyById(id);
            setCurrentPrice(parseFloat(data.priceUsd));
        } catch (error) {
            console.error("Error fetching current price:", error);
        }
    };

    const handleBack = () => {
        navigate('/assets');
    };

    const calculateTotalInvestment = () => {
        return asset.transactions.reduce((total, transaction) => total + transaction.amountInvested, 0);
    };

    const calculateTotalCurrentValue = () => {
        return asset.transactions.reduce((total, transaction) => total + (transaction.quantity * currentPrice), 0);
    };

    const calculateTotalPerformance = () => {
        const totalInvestment = calculateTotalInvestment();
        const totalCurrentValue = calculateTotalCurrentValue();
        if (totalInvestment === 0) return 0; // Avoid division by zero
        const performance = ((totalCurrentValue - totalInvestment) / totalInvestment) * 100;
        return performance.toFixed(2);
    };

    const formatDate = (date) => {
        return moment(date).isValid() ? moment(date).format('MM/DD/YYYY') : 'Invalid Date';
    };

    if (!asset) {
        return <p>Loading...</p>;
    }

    const totalPerformance = calculateTotalPerformance();

    return (
        <div className="assets-page-detailed-view">
            <h2 className="assets-page-detailed-view-header">{asset.name} ({asset.symbol}) Transactions</h2>
            <button className="back-button" onClick={handleBack}>Return to Assets</button>
            <header className="total-performance-header">
                <h3>Total Investment Performance:</h3>
            </header>
            <div className="total-performance">
                <p style={{ color: totalPerformance >= 0 ? 'green' : 'red' }}>
                    {totalPerformance >= 0 ? '+' : '-'}${Math.abs(totalPerformance)}
                </p>
            </div>
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
                        const currentValue = transaction.quantity * currentPrice;
                        const change = currentValue - transaction.amountInvested;
                        return (
                            <tr key={index}>
                                <td>{formatDate(transaction.date)}</td>
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

export default AssetsPastTransactions;
