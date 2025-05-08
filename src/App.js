import './App.css';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import VehiclesList from './components/vehicles/VehiclesList';
import VehicleDetails from './components/vehicles/VehicleDetails';
import SearchBar from './components/app/SearchBar.jsx';
import PilotsList from './components/pilots/PilotsList';
import PilotDetail from './components/pilots/PilotDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Rutas protegidas */}
                    <Route path="/vehicles" element={<ProtectedRoute><VehiclesList /></ProtectedRoute>} />
                    <Route path="/vehicles/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
                    <Route path="/pilots" element={<ProtectedRoute><PilotsList /></ProtectedRoute>} />
                    <Route path="/pilots/:id" element={<ProtectedRoute><PilotDetail /></ProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;