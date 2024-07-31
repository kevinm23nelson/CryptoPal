import React from 'react'

const Filter = ({ onFilterChange }) => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter By: </label>
      <select id="filter" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="rank">Default (Rank/MarketCap)</option>
        <option value="24hrpositive">Change Up (24hr +)</option>
        <option value="24hrnegative">Change Down (24hr -)</option>
        <option value="6month">Change (6 Months)</option>
      </select>
    </div>
  )
}

export default Filter





