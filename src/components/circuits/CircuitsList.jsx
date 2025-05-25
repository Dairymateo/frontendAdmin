import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CircuitService from "../../services/circuits";
import CircuitForm from "./CircuitForm";
import './styles/CircuitList.css';

function CircuitsList() {
    const [circuits, setCircuits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddingCircuit, setIsAddingCircuit] = useState(false);
    const [editingCircuitId, setEditingCircuitId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCircuits();
        checkAdminStatus();
    }, []);

    const checkAdminStatus = () => {
        const isAdminFromStorage = localStorage.getItem('isAdmin');
        setIsAdmin(isAdminFromStorage === 'true');
    };

    const fetchCircuits = async () => {
        try {
            const data = await CircuitService.getAllCircuits();
            setCircuits(data);
            // Puedes dejar este console.log para verificar si sigues teniendo dudas,
            // pero si confirmaste que es '_id', puedes quitarlo.
            console.log("Datos de circuitos recuperados:", data);
            setLoading(false);
            setError('');
        } catch (error) {
            setError(error.message || 'Failed to load circuits. Please try again later.');
            setLoading(false);
        }
    };

    const handleAddCircuitClick = () => {
        setIsAddingCircuit(true);
    }

    const handleCancelAddCircuit = () => {
        setIsAddingCircuit(false);
        setSuccessMessage('');
    };

    const handleCreateCircuit = async (newCircuitData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                await CircuitService.createCircuit(newCircuitData, token);
                fetchCircuits();
                setIsAddingCircuit(false);
                setSuccessMessage('Circuito creado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al crear el circuito.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para crear circuitos.');
        }
    };

    // Cambiado para usar circuit._id
    const handleEditClick = (id) => setEditingCircuitId(id);
    const handleCancelEdit = () => {
        setEditingCircuitId(null);
    };

    const handleUpdateCircuit = async (id, updatedCircuitData) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                await CircuitService.updateCircuit(id, updatedCircuitData, token);
                fetchCircuits();
                setEditingCircuitId(null);
                setSuccessMessage('Circuito actualizado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al actualizar el circuito.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para editar circuitos.');
        }
    };

    const handleDeleteClick = async (id) => {
        if (isAdmin) {
            try {
                const token = localStorage.getItem('authToken');
                await CircuitService.deleteCircuit(id, token);
                fetchCircuits();
                setSuccessMessage('Circuito eliminado exitosamente.');
                setError('');
            } catch (error) {
                setError(error.message || 'Error al eliminar el circuito.');
                setSuccessMessage('');
            }
        } else {
            setError('No tienes permisos para eliminar circuitos.');
        }
    };

    if (loading) {
        return <div>Cargando circuitos...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="circuits-page">
            <header className="circuits-header">
                <h1 className="circuits-title">Circuitos</h1> {/* Título en español */}
                {isAdmin && (
                    <button
                        className="add-circuit-btn"
                        onClick={handleAddCircuitClick}
                    >
                        +
                    </button>
                )}
            </header>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {isAddingCircuit && (
                <div className="add-circuit-modal">
                    <CircuitForm
                        onSubmit={handleCreateCircuit}
                        onCancel={handleCancelAddCircuit}
                        isEditing={false}
                    />
                </div>
            )}

            <div className="circuits-grid">
                {circuits.map((circuit) => (
                    // Usamos circuit._id como key
                    <div key={circuit._id} className="circuit-card">
                        {editingCircuitId === circuit._id ? ( 
                            <CircuitForm
                                circuit={circuit}
                                onSubmit={(updatedData) => handleUpdateCircuit(circuit._id, updatedData)} // Pasando circuit._id
                                onCancel={handleCancelEdit}
                                isEditing={true}
                            />
                        ) : (
                            <>
                                
                                <Link to={`/circuits/${circuit._id}`} className="circuit-card-link">
                                    <div className="circuit-image">
                                        <img
                                            src={circuit.image || '/default-circuit.jpg'}
                                            alt={circuit.name}
                                        />
                                    </div>
                                    <div className="circuit-info">
                                        <h3 className="circuit-name">{circuit.name}</h3>
                                        <div className="circuit-details">
                                            <span className="circuit-country">{circuit.ubication}</span>
                                            <span className="circuit-length">{circuit.longitudRectaMasLargaKm} km</span>
                                        </div>
                                        <div className="circuit-extra">
                                            <span className="circuit-turns">{circuit.cantidadCurvas} curvas</span> 
                                        </div>
                                    </div>
                                </Link>
                                {isAdmin && (
                                    <div className="circuit-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita que el Link se active
                                                handleEditClick(circuit._id); // Usando circuit._id
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita que el Link se active
                                                handleDeleteClick(circuit._id); // Usando circuit._id
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {circuits.length === 0 && !loading && (
                <div className="no-circuits">
                    <p>No hay circuitos disponibles en este momento.</p> {/* Mensaje en español */}
                </div>
            )}
        </div>
    );
}

export default CircuitsList;