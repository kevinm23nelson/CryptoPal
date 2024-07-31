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
    console.log('Loaded favorites from local storage:', savedFavorites);

    if (savedFavorites.length === 0) {
      setFavorites([]);
      return;
    }

    try {
      const updatedFavorites = await Promise.all(
        savedFavorites.map(async (fav) => {
          const updatedCurrency = await getCurrencyById(fav.id);
          const historicalData = await getHistoricalData(fav.id);
          const oneYearPerformance = calculateOneYearPerformance(historicalData);
          console.log(`One year performance for ${fav.id}:`, oneYearPerformance);
          return { ...fav, ...updatedCurrency, oneYearPerformance };
        })
      );
      setFavorites(updatedFavorites);
      console.log('Updated favorites:', updatedFavorites);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFavoritesData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Fetching data at interval');
      fetchFavoritesData();
    }, 10000);

    return () => clearInterval(interval);
  }, [favorites]);

  const removeFavorite = (currencyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== currencyId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
    console.log(`Removed favorite with ID: ${currencyId}`);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredFavorites = () => {
    const sortedFavorites = [...favorites];
    console.log('Sorting favorites with filter:', filter);

    switch (filter) {
      case '24hrpositive':
        sortedFavorites.sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr));
        break;
      case '24hrnegative':
        sortedFavorites.sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr));
        break;
      case '1year':
        sortedFavorites.sort((a, b) => parseFloat(b.oneYearPerformance.percentageChange) - parseFloat(a.oneYearPerformance.percentageChange));
        break;
      case 'rank':
      default:
        sortedFavorites.sort((a, b) => a.rank - b.rank);
        break;
    }

    console.log('Filtered favorites:', sortedFavorites);
    return sortedFavorites;
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