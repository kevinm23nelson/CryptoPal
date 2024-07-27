import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search currencies here..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
