import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../../LocalStorage';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (currencyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== currencyId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <Filter />
      <CurrencyCard favorites={favorites} onRemoveFavorite={removeFavorite} />
    </div>
  );
};

export default Dashboard;
