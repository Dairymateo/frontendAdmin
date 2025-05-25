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
    
    const [currentCircuitToEdit, setCurrentCircuitToEdit] = useState(null); 
    const [showFormModal, setShowFormModal] = useState(false);

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
            setLoading(false);
            setError('');
        } catch (error) {
            setError(error.message || 'Failed to load circuits. Please try again later.');
            setLoading(false);
        }
    };

    const handleAddCircuitClick = () => {
        setCurrentCircuitToEdit(null); 
        setShowFormModal(true);        
        setSuccessMessage('');
        setError('');
    }

    const handleEditClick = (circuit) => { 
        setCurrentCircuitToEdit(circuit); 
        setShowFormModal(true);           
        setSuccessMessage('');
        setError('');
    };

    const handleFormSubmit = async (formData) => {
        if (!isAdmin) {
            setError('No tienes permisos para realizar esta acción.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            if (currentCircuitToEdit) { 
                await CircuitService.updateCircuit(currentCircuitToEdit._id, formData, token);
                setSuccessMessage('Circuito actualizado exitosamente.');
            } else { 
                await CircuitService.createCircuit(formData, token);
                setSuccessMessage('Circuito creado exitosamente.');
            }
            
            fetchCircuits(); 
            setShowFormModal(false); 
            setCurrentCircuitToEdit(null); 
            setError('');
        } catch (error) {
            setError(error.message || `Error al ${currentCircuitToEdit ? 'actualizar' : 'crear'} el circuito.`);
            setSuccessMessage('');
        }
    };

    const handleCancelForm = () => {
        setShowFormModal(false);
        setCurrentCircuitToEdit(null); 
        setSuccessMessage('');
        setError('');
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
                <h1 className="circuits-title">Circuitos</h1>
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

            {showFormModal && ( 
                <div className="add-circuit-modal">
                    <CircuitForm
                        initialValues={currentCircuitToEdit} 
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                    />
                </div>
            )}

            <div className="circuits-grid">
                {circuits.map((circuit) => (
                    <div key={circuit._id} className="circuit-card">
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
                                        e.stopPropagation();
                                        handleEditClick(circuit); 
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(circuit._id);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {circuits.length === 0 && !loading && (
                <div className="no-circuits">
                    <p>No hay circuitos disponibles en este momento.</p>
                </div>
            )}
        </div>
    );
}

export default CircuitsList;