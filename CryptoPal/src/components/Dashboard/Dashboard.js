import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('rank')

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (currencyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== currencyId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter)
  }

  const getFiltertedFavorites = () => {
    switch (filter) {
      case '24hrpositive':
        return [...favorites].sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
      case '24hrnegavtive':
        return [...favorites].sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr))
      case 'rank':
      default:
        return [...favorites].sort((a, b) => a.rank - b.rank)
    }
  }
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <CurrencyCard favorites={getFiltertedFavorites()} onRemoveFavorite={removeFavorite} />
    </div>
  );
};

export default Dashboard;
