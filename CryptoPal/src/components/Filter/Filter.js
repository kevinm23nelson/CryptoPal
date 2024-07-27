import React from 'react'

const Filter = () => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter By Performance: </label>
      <select id="filter">
        <option value="24hrpositive">Change Up (24hr +)</option>
        <option value="24hrnegative">Change Down (24hr -)</option>
        <option value="6month">Change (6 Months)</option>
      </select>
    </div>
  )
}

export default Filter