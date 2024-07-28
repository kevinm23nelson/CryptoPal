import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import ExplorePage from './components/ExplorePage/ExplorePage';
import CurrencyDetailsPage from './components/CurrencyDetailsPage/CurrencyDetailsPage';
import SideBar from './components/SideBar/SideBar';

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
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

