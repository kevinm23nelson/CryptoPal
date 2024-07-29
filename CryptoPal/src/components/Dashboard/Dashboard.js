import React, { useEffect, useState, useRef, useCallback } from 'react';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard, { calculateSixMonthPerformance } from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import { getCurrencyById, getHistoricalData } from '../../api/apiCalls';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('rank');
  const prevFavoritesLength = useRef(favorites.length);

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  const updateFavoritesData = useCallback(async () => {
    const updatedFavorites = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const updatedCurrency = await getCurrencyById(fav.id);
          const historicalData = await getHistoricalData(fav.id);
          const sixMonthPerformance = calculateSixMonthPerformance(historicalData);
          return { ...fav, ...updatedCurrency, sixMonthPerformance };
        } catch (error) {
          console.error(`Error fetching data for ${fav.id}:`, error);
          return fav;
        }
      })
    );
    setFavorites(updatedFavorites);
  }, [favorites]);

  useEffect(() => {
    if (favorites.length !== prevFavoritesLength.current) {
      prevFavoritesLength.current = favorites.length;
      if (favorites.length > 0) {
        updateFavoritesData();
      }
    }
  }, [favorites, updateFavoritesData]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateFavoritesData();
    }, 10000);

    return () => clearInterval(interval);
  }, [updateFavoritesData]);

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
      case '6month':
        return [...favorites].sort(
          (a, b) => parseFloat(b.sixMonthPerformance.percentageChange) - parseFloat(a.sixMonthPerformance.percentageChange)
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
