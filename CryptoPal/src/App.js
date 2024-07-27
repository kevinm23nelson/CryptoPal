import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import ExplorePage from './components/ExplorePage/ExplorePage';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
