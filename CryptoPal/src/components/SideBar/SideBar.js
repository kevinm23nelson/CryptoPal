import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="app-sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/" className="sidebar-button">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/explore" className="sidebar-button">
            Explore
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
