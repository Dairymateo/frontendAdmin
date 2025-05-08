
import './App.css';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import { Routes, Route, useLocation} from 'react-router-dom';
import React from 'react';
import VehiclesList from './components/vehicles/VehiclesList';
import VehicleDetails from './components/vehicles/VehicleDetails';
import SearchBar from './components/app/SearchBar.jsx'; 

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  
  return (

    <div className="app">
        {!isAuthPage && (
            <div className="app__sidebar">
                <SearchBar />
            </div>
        )}
        <div className="app__content" style={isAuthPage ? { marginLeft: 0 } : {}}>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/vehicles" element={<VehiclesList />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
            </Routes>
        </div>
    </div>


  );
}

export default App;
