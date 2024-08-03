import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CurrencyList from '../CurrencyList/CurrencyList';
import { loadFavorites, saveFavorites } from '../../utils/localStorage/LocalStorage';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = loadFavorites();
    setFavorites(savedFavorites);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const toggleFavorite = (currency) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.id === currency.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== currency.id);
    } else {
      updatedFavorites = [...favorites, currency];
    }
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  return (
    <div className="explore-page">
      <header className="explore-page-header">
        <h1>Top 100 Currencies</h1>
        <h2>(You can only trade favorites)</h2>
      </header>
      <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <br />
      <CurrencyList searchQuery={searchQuery} favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default ExplorePage;