import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import homeIcon from '../../images/home-page-white-icon.webp';
import searchIcon from '../../images/search-white-icon.png';
import coinIcon from '../../images/green-white-coin-icon.png';

const SideBar = () => {
  return (
    <div className="app-sidebar">
      <div className="sidebar-header">
        <img src={coinIcon} alt="CryptoPal Icon" className="header-icon" />
        <h1 className="sidebar-header-text">CryptoPal</h1>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/" className="sidebar-button">
            <img src={homeIcon} alt="Home Icon" className="sidebar-icon" />
            <span className="sidebar-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" className="sidebar-button">
            <img src={searchIcon} alt="Search Icon" className="sidebar-icon" />
            <span className="sidebar-text">Explore</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
