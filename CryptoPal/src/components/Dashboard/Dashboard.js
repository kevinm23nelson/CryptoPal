import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import { getCurrencyById } from '../../api/apiCalls'; // Ensure this function is implemented correctly
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('rank');

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const updateFavoritesData = async () => {
      const updatedFavorites = await Promise.all(
        favorites.map(async (fav) => {
          try {
            const updatedCurrency = await getCurrencyById(fav.id);
            return { ...fav, ...updatedCurrency };
          } catch (error) {
            console.error(`Error fetching data for ${fav.id}:`, error);
            return fav;
          }
        })
      );
      setFavorites(updatedFavorites);
    };

    // Initial fetch for updated data
    if (favorites.length > 0) {
      updateFavoritesData();
    }
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
        return [...favorites].sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr));
      case '24hrnegative':
        return [...favorites].sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr));
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
