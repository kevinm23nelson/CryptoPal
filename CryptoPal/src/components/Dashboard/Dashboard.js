import React from 'react';
import './Dashboard.css';
import Filter from '../Filter/Filter';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <Filter />
    </div>
  );
};

export default Dashboard;
