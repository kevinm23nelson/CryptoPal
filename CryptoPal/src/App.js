// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import ExplorePage from './components/ExplorePage/ExplorePage';
import CurrencyDetailsPage from './components/CurrencyDetailsPage/CurrencyDetailsPage';
import SideBar from './components/SideBar/SideBar';
import TradePage from './components/TradePage/TradePage';
import AssetsPage from './components/AssetsPage/AssetsPage';
import AssetsPastTransactions from './components/AssetsPage/AssetsPastTransactions';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'; // Import the NotFoundPage component

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <SideBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/currency/:id" element={<CurrencyDetailsPage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/assets-past-transactions/:id" element={<AssetsPastTransactions />} />
              <Route path="*" element={<NotFoundPage />} /> {/* Add a catch-all route */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
