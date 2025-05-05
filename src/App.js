
import './App.css';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React from 'react';
import VehiclesList from './components/vehicles/VehiclesList';
import VehicleDetails from './components/vehicles/VehicleDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li className="app__nav-item"><Link to="/" className="app__nav-link">Home</Link></li>
            <li className="app__nav-item"><Link to="/signup" className="app__nav-link">Sign Up</Link></li>
            <li className="app__nav-item"><Link to="/login" className="app__nav-link">Login</Link></li>
            <li className="app__nav-item"><Link to="/vehicles" className="app__nav-link">Vehicles</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehicles" element={<VehiclesList />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />

        </Routes>
      
      </div>
    </Router>

  );
}

export default App;
