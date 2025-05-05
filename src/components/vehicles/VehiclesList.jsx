import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/VehiclesList.css';
import * as VehicleService from "../../services/vehicles";


function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await VehicleService.getAllVehicles();
                setVehicles(data);
                setLoading(false);
            } catch (error) {
                setError(error.message ||  'Failed to load vehicles. Please try again later.');
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="vehicles-list-container">
            <h1>Vehicles List</h1>
            {vehicles.length > 0 ? (
                <ul className="vehicles-list">
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.id} className="vehicle-item">
                            <Link to={`/vehicles/${vehicle._id}`}>
                                <h2>{vehicle.name}</h2>
                                
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vehicles available.</p>
            )}
            
        </div>
    );
}

export default VehiclesList;