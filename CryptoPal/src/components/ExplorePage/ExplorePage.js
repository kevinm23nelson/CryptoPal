import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import CurrencyList from '../CurrencyList/CurrencyList'
import './ExplorePage.css'

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <header className="explore-page-header">
        <h1>TOP 100 CURRENCIES</h1>
      </header>
      <SearchBar />
      <br />
      <CurrencyList />
    </div>
  )
}

export default ExplorePage