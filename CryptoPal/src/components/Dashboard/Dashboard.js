import React from 'react';
import './Dashboard.css';
import Filter from '../Filter/Filter';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Filter />
    </div>
  );
};

export default Dashboard;
