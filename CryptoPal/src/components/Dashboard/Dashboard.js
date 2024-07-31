import React, { useEffect, useState } from 'react';
import { loadFavorites } from '../../LocalStorage';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import Filter from '../Filter/Filter';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <Filter />
      <CurrencyCard favorites={favorites} />
    </div>
  );
};

export default Dashboard;
