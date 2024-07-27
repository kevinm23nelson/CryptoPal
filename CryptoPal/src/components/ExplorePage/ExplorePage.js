import React from 'react'
import SearchBar from '../SearchBar/SearchBar'

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <header className="explore-page-header">
        <h1>TOP 100 CURRENCIES</h1>
      </header>
      <SearchBar />
    </div>
  )
}

export default ExplorePage