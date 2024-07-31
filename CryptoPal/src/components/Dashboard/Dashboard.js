import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard, { calculateOneYearPerformance } from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import { getCurrencyById, getHistoricalData } from '../../api/apiCalls';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('rank');

  const fetchFavoritesData = async () => {
    const savedFavorites = loadFavorites();
    if (savedFavorites.length === 0) {
      setFavorites([]);
      return;
    }

    try {
      const updatedFavorites = await Promise.all(
        savedFavorites.map(async (fav) => {
          const updatedCurrency = await getCurrencyById(fav.id);
          const historicalData = await getHistoricalData(fav.id);
          const oneYearPerformance = calculateOneYearPerformance(historicalData); // Updated to one year
          return { ...fav, ...updatedCurrency, oneYearPerformance }; // Updated to one year
        })
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFavoritesData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFavoritesData(); // Call the fetch function within the interval
    }, 10000);

    return () => clearInterval(interval);
  }, [favorites]);

  const removeFavorite = (currencyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== currencyId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredFavorites = () => {
    switch (filter) {
      case '24hrpositive':
        return [...favorites].sort(
          (a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
        );
      case '24hrnegative':
        return [...favorites].sort(
          (a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr)
        );
      case '1year': // Updated to 1 year
        return [...favorites].sort(
          (a, b) => parseFloat(b.oneYearPerformance.percentageChange) - parseFloat(a.oneYearPerformance.percentageChange) // Updated to 1 year
        );
      case 'rank':
      default:
        return [...favorites].sort((a, b) => a.rank - b.rank);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <CurrencyCard favorites={getFilteredFavorites()} onRemoveFavorite={removeFavorite} />
    </div>
  );
};

export default Dashboard;
