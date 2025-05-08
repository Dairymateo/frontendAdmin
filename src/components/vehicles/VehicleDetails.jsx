import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
//import './styles/VehicleDetails.css';
import * as VehicleService from "../../services/vehicles";


function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await VehicleService.getVehicleById(id);
                setVehicle(data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Failed to load vehicle details. Please try again later.');
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="vehicle-details-container">
            <h2>Detalles Vehículo</h2>
            <h3>{vehicle.name}</h3>
            <p>Equipo: {vehicle.equipo} </p>
            <p>Velocidad Maxima: {vehicle.velocidadPunta} </p>
            <p>Fiabilidad: {vehicle.fiabilidad} </p>
            <p>peso: {vehicle.peso} </p>
            
        </div>
    )
}

export default VehicleDetails;