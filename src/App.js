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
import CircuitsList from './components/circuits/CircuitsList';
import CircuitDetails from './components/circuits/CircuitDetails';
import PredictionComponent from './components/prediction/PredictionComponent';

function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="app">
            {!isAuthPage && (
                <>
                    <SearchBar />
                    <div className="app__sidebar-placeholder"></div>
                </>
            )}
            <div className={`app__content ${isAuthPage ? 'app__content--full-width' : 'app__content--with-sidebar'}`}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/vehicles" element={<ProtectedRoute><VehiclesList /></ProtectedRoute>} />
                    <Route path="/vehicles/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
                    <Route path="/pilots" element={<ProtectedRoute><PilotsList /></ProtectedRoute>} />
                    <Route path="/pilots/:id" element={<ProtectedRoute><PilotDetail /></ProtectedRoute>} />
                    <Route path="/circuits" element={<ProtectedRoute><CircuitsList /></ProtectedRoute>} />
                    <Route path="/circuits/:id" element={<ProtectedRoute><CircuitDetails /></ProtectedRoute>} />
                    <Route path="/predictions" element={<ProtectedRoute><PredictionComponent /></ProtectedRoute>} />

                </Routes>
            </div>
        </div>
    );
}

export default App;