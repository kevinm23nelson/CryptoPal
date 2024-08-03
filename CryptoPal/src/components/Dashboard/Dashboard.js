// Dashboard.js
import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../../utils/localStorage/LocalStorage';
import CurrencyCard, { calculateOneYearPerformance } from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import { getCurrencyById, getHistoricalData } from '../../utils/api/apiCalls';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('rank');
  const [loading, setLoading] = useState(true); 

  const fetchFavoritesData = async () => {
    const savedFavorites = loadFavorites();

    if (savedFavorites.length === 0) {
      setFavorites([]);
      setLoading(false); 
      return;
    }

    try {
      const updatedFavorites = await Promise.all(
        savedFavorites.map(async (fav) => {
          const updatedCurrency = await getCurrencyById(fav.id);
          const historicalData = await getHistoricalData(fav.id);
          const oneYearPerformance = calculateOneYearPerformance(historicalData);
          return { ...fav, ...updatedCurrency, oneYearPerformance };
        })
      );
      setFavorites(updatedFavorites);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchFavoritesData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFavoritesData();
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
    const sortedFavorites = [...favorites];

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

    return sortedFavorites;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Favorite Currencies</h1>
      </div>
      <div className="filter-container">
        <Filter onFilterChange={handleFilterChange} includeOneYear={true} />
      </div>
      <CurrencyCard 
        favorites={getFilteredFavorites()} 
        onRemoveFavorite={removeFavorite} 
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
