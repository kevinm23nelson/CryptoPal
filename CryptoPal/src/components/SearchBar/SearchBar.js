import React from 'react'

const SearchBar = ({searchQuery, handleSearchChange}) => {

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search currencies here..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        />
    </div>
  )
}

export default SearchBar