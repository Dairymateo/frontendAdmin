import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/VehiclesList.css';
import * as VehicleService from "../../services/vehicles";
import VehicleForm from "./VehicleForm";

function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddingVehicle, setIsAddingVehicle] = useState(false);
    const [editingVehicleId, setEditingVehicleId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchVehicles();
        checkAdminStatus();
    }, []);

    const checkAdminStatus = () => {
        const isAdminFromStorage = localStorage.getItem('isAdmin');
        setIsAdmin(isAdminFromStorage === 'true');
    };

    const fetchVehicles = async () => {
        try {
            const data = await VehicleService.getAllVehicles();
            setVehicles(data);
            setLoading(false);
            setError('');
        } catch (error) {
            setError(error.message || 'Failed to load vehicles. Please try again later.');
            setLoading(false);
        }
    };

    const handleAddVehicleClick = () => {
        setIsAddingVehicle(true);
    };

    const handleCancelAddVehicle = () => {
        setIsAddingVehicle(false);
        setSuccessMessage('');
    };

    const handleCreateVehicle = async (newVehicleData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                const vehicleToSend = {
                    ...newVehicleData,
                    velocidadPunta: Number(newVehicleData.velocidadPunta),
                    fiabilidad: Number(newVehicleData.fiabilidad),
                    peso: Number(newVehicleData.peso),
                };
                await VehicleService.createVehicle(vehicleToSend, token);
                fetchVehicles();
                setIsAddingVehicle(false);
                setSuccessMessage('Vehículo creado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al crear el vehículo.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para crear vehículos.');
        }
    };

    const handleEditClick = (id) => setEditingVehicleId(id);
    const handleCancelEditVehicle = () => setEditingVehicleId(null);

    const handleUpdateVehicle = async (id, updatedVehicleData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                const vehicleToUpdate = {
                    ...updatedVehicleData,
                    velocidadPunta: Number(updatedVehicleData.velocidadPunta),
                    fiabilidad: Number(updatedVehicleData.fiabilidad),
                    peso: Number(updatedVehicleData.peso),
                };
                await VehicleService.updateVehicle(id, vehicleToUpdate, token);
                fetchVehicles();
                setEditingVehicleId(null);
                setSuccessMessage('Vehículo actualizado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al actualizar el vehículo.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para editar vehículos.');
        }
    };

    const handleDeleteVehicle = async (id) => {
        if (isAdmin && window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
            try {
                const token = localStorage.getItem('authToken');
                await VehicleService.deleteVehicle(id, token);
                setVehicles(vehicles.filter(v => v._id !== id));
                setSuccessMessage('Vehículo eliminado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al eliminar el vehículo.');
                setSuccessMessage('');
            }
        } else if (!isAdmin) {
            setError('No tienes permisos para eliminar vehículos.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="vehicles-list-container">
            <h1>Vehicles List</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            {isAdmin && (
                <div className="admin-actions">
                    {!isAddingVehicle && (
                        <button onClick={handleAddVehicleClick}>Agregar Vehículo</button>
                    )}
                    {isAddingVehicle && (
                        <VehicleForm onSubmit={handleCreateVehicle} onCancel={handleCancelAddVehicle} />
                    )}
                </div>
            )}

            <ul className="vehicles-list">
                {vehicles.map((vehicle) => (
                    <li key={vehicle._id} className="vehicle-item">
                        <Link to={`/vehicles/${vehicle._id}`}>
                            <h2>{vehicle.name}</h2>
                        </Link>
                        {isAdmin && (
                            <div className="admin-controls">
                                <button onClick={() => handleEditClick(vehicle._id)}>Editar</button>
                                <button onClick={() => handleDeleteVehicle(vehicle._id)}>Eliminar</button>
                                {editingVehicleId === vehicle._id && (
                                    <VehicleForm
                                        initialValues={vehicle}
                                        onSubmit={(data) => handleUpdateVehicle(vehicle._id, data)}
                                        onCancel={handleCancelEditVehicle}
                                        
                                    />
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VehiclesList;