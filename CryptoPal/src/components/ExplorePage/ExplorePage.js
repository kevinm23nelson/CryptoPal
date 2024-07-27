import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CurrencyList from '../CurrencyList/CurrencyList';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="explore-page">
      <header className="explore-page-header">
        <h1>TOP 100 CURRENCIES</h1>
      </header>
      <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <br />
      <CurrencyList searchQuery={searchQuery} />
    </div>
  );
};

export default ExplorePage;
