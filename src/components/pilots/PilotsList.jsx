import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import './styles/PilotsList.css'; 
import * as PilotService from "../../services/pilots"; 
import PilotForm from "./PilotForm"; 

function PilotsList() {
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddingPilot, setIsAddingPilot] = useState(false);
    const [editingPilotId, setEditingPilotId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPilots();
        checkAdminStatus(); // Reutiliza la función de VehiclesList
    }, []);

    const checkAdminStatus = () => {
        const isAdminFromStorage = localStorage.getItem('isAdmin');
        setIsAdmin(isAdminFromStorage === 'true');
    };

    const fetchPilots = async () => {
        try {
            const data = await PilotService.getAllPilots();
            setPilots(data);
            setLoading(false);
            setError('');
        } catch (error) {
            setError(error.message || 'Failed to load pilots. Please try again later.');
            setLoading(false);
        }
    };

    const handleAddPilotClick = () => {
        setIsAddingPilot(true);
    };

    const handleCancelAddPilot = () => {
        setIsAddingPilot(false);
        setSuccessMessage('');
    };

    const handleCreatePilot = async (newPilotData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                await PilotService.createPilot(newPilotData, token);
                fetchPilots();
                setIsAddingPilot(false);
                setSuccessMessage('Piloto creado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al crear el piloto.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para crear pilotos.');
        }
    };

    const handleEditClick = (id) => setEditingPilotId(id);

    const handleUpdatePilot = async (id, updatedPilotData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                await PilotService.updatePilot(id, updatedPilotData, token, 'PATCH'); // Asumiendo PATCH para actualizar
                fetchPilots();
                setEditingPilotId(null);
                setSuccessMessage('Piloto actualizado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al actualizar el piloto.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para editar pilotos.');
        }
    };

    const handleDeletePilot = async (id) => {
        if (isAdmin && window.confirm('¿Estás seguro de que deseas eliminar este piloto?')) {
            try {
                const token = localStorage.getItem('authToken');
                await PilotService.deletePilot(id, token);
                setPilots(pilots.filter(p => p._id !== id));
                setSuccessMessage('Piloto eliminado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al eliminar el piloto.');
                setSuccessMessage('');
            }
        } else if (!isAdmin) {
            setError('No tienes permisos para eliminar pilotos.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="pilots-list-container">
            <h1>Lista de Pilotos</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            {isAdmin && (
                <div className="admin-actions">
                    {!isAddingPilot && (
                        <button onClick={handleAddPilotClick}>Agregar Piloto</button>
                    )}
                    {isAddingPilot && (
                        <PilotForm onSubmit={handleCreatePilot} onCancel={handleCancelAddPilot} />
                    )}
                </div>
            )}

            <ul className="pilots-list">
                {pilots.map((pilot) => (
                    <li key={pilot._id} className="pilot-item">
                        <Link to={`/pilots/${pilot._id}`}>
                            <h2>{pilot.name}</h2>
                            <p>Equipo: {pilot.equipo}</p>
                            <p>Nacionalidad: {pilot.nacionalidad}</p>
                        </Link>
                        {isAdmin && (
                            <div className="admin-controls">
                                <button onClick={() => handleEditClick(pilot._id)}>Editar</button>
                                <button onClick={() => handleDeletePilot(pilot._id)}>Eliminar</button>
                                {editingPilotId === pilot._id && (
                                    <PilotForm
                                        initialValues={pilot}
                                        onSubmit={(data) => handleUpdatePilot(pilot._id, data)}
                                        onCancel={handleCancelAddPilot}
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

export default PilotsList;