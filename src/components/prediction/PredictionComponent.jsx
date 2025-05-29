// src/components/PredictionComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/PredictionComponent.css';

const PredictionComponent = () => {
    // Estado para la lista completa de circuitos
    const [circuits, setCircuits] = useState([]);
    // Estado para el índice del circuito actual en la lista 'circuits'
    const [currentCircuitIndex, setCurrentCircuitIndex] = useState(0);
    // Estado para el ranking de pilotos del circuito actual
    const [ranking, setRanking] = useState([]);
    // Estado para el piloto seleccionado para el popup
    const [selectedPilotEntry, setSelectedPilotEntry] = useState(null);
    // Estado para controlar la visibilidad del popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Estados de carga y error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingCircuits, setLoadingCircuits] = useState(true);
    const [errorCircuits, setErrorCircuits] = useState(null);

    const API_BASE_URL = 'https://coreweb.onrender.com'; // Confirma tu URL base del backend

    // --- Función para cargar TODOS los circuitos (se ejecuta una vez al montar) ---
    const fetchAllCircuits = async () => {
        setLoadingCircuits(true);
        setErrorCircuits(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/circuits`);
            if (response.data && response.data.length > 0) {
                setCircuits(response.data);
                // Si hay circuitos, intentar cargar el ranking del primero
                // fetchRanking(response.data[0]._id, response.data[0].name); // Llamada inicial al ranking
            } else {
                setErrorCircuits("No se encontraron circuitos en la base de datos.");
            }
        } catch (err) {
            console.error("Error al cargar la lista de circuitos:", err);
            setErrorCircuits("Error al cargar los circuitos disponibles.");
        } finally {
            setLoadingCircuits(false);
        }
    };

    // --- Función para obtener el ranking de UN circuito específico ---
    const fetchRankingForCircuit = async (circuitId, circuitName) => {
        if (!circuitId) {
            setError("No hay circuito seleccionado para la predicción.");
            setRanking([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/pilots/ranking/circuit/${circuitId}`);
            setRanking(response.data);
        } catch (err) {
            console.error(`Error al obtener el ranking para ${circuitName}:`, err);
            setError(`Error al cargar la predicción para ${circuitName}. Inténtalo de nuevo.`);
            setRanking([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Efecto: Cargar todos los circuitos al montar el componente ---
    useEffect(() => {
        fetchAllCircuits();
    }, []);

    // --- Efecto: Cargar el ranking cuando los circuitos se cargan o el índice cambia ---
    useEffect(() => {
        if (circuits.length > 0 && currentCircuitIndex >= 0 && currentCircuitIndex < circuits.length) {
            const currentCircuit = circuits[currentCircuitIndex];
            fetchRankingForCircuit(currentCircuit._id, currentCircuit.name);
        } else if (!loadingCircuits && circuits.length === 0) {
            setRanking([]); // No hay circuitos para mostrar ranking
        }
    }, [circuits, currentCircuitIndex, loadingCircuits]); // Dependencias: lista de circuitos y el índice actual

    // --- Funciones de navegación ---
    const handleNextCircuit = () => {
        if (circuits.length > 0 && currentCircuitIndex < circuits.length - 1) {
            setCurrentCircuitIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevCircuit = () => {
        if (currentCircuitIndex > 0) {
            setCurrentCircuitIndex(prevIndex => prevIndex - 1);
        }
    };

    // --- Funciones de Popup ---
    const handlePilotClick = (entry) => {
        setSelectedPilotEntry(entry);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setSelectedPilotEntry(null);
        setIsPopupOpen(false);
    };

    // Obtener el circuito actual para mostrar su nombre y otros detalles
    const currentCircuit = circuits.length > 0 ? circuits[currentCircuitIndex] : null;

    return (
        <div className="prediction-container">
            <h1>Predicción del Ranking de Pilotos</h1>

            {loadingCircuits && <p>Cargando circuitos disponibles...</p>}
            {errorCircuits && <p className="error-message">{errorCircuits}</p>}

            {!loadingCircuits && !errorCircuits && circuits.length === 0 && (
                <p>No hay circuitos para mostrar predicciones. Por favor, agrega circuitos.</p>
            )}

            {!loadingCircuits && !errorCircuits && circuits.length > 0 && (
                <>
                    <div className="circuit-navigation">
                        <button onClick={handlePrevCircuit} disabled={currentCircuitIndex === 0}>
                            Anterior Pista
                        </button>
                        <span>
                            {currentCircuit ? `Pista Actual: ${currentCircuit.name}` : "Seleccionando Pista..."}
                            {currentCircuit && currentCircuit.dificultadCircuito && ` (Dificultad: ${currentCircuit.dificultadCircuito.toFixed(1)})`}
                        </span>
                        <button onClick={handleNextCircuit} disabled={currentCircuitIndex === circuits.length - 1}>
                            Siguiente Pista
                        </button>
                    </div>

                    {loading && <p>Cargando ranking para {currentCircuit?.name || 'la pista actual'}...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && ranking.length === 0 && (
                        <p>No se encontraron pilotos para este circuito o no hay datos disponibles.</p>
                    )}

                    {!loading && !error && ranking.length > 0 && (
                        <div className="ranking-list">
                            <h2>Ranking de Pilotos</h2>
                            <ol>
                                {ranking.map((entry, index) => (
                                    <li key={entry.pilot._id} onClick={() => handlePilotClick(entry)}>
                                        {index + 1}. {entry.pilot.name} - {entry.pilot.equipo}
                                        {/* Puedes añadir la bandera aquí si la tienes */}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </>
            )}

            {/* Popup para mostrar la información detallada del piloto */}
            {isPopupOpen && selectedPilotEntry && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Detalles de {selectedPilotEntry.pilot.name}</h2>
                        <p><strong>Posición en Ranking:</strong> {ranking.findIndex(e => e.pilot._id === selectedPilotEntry.pilot._id) + 1}</p>
                        <p><strong>Rendimiento Final (Circuito):</strong> {selectedPilotEntry.finalPerformance.toFixed(4)}</p>
                        <hr/>
                        <p><strong>Equipo:</strong> {selectedPilotEntry.pilot.equipo}</p>
                        <p><strong>Nacionalidad:</strong> {selectedPilotEntry.pilot.nacionalidad}</p>
                        <p><strong>Promedio Posición General:</strong> {selectedPilotEntry.pilot.promedioPosicionFinalGeneral}</p>
                        <p><strong>Porcentaje Abandono General:</strong> {selectedPilotEntry.pilot.porcentajeAbandonoGeneral}%</p>
                        <p><strong>Rendimiento General Piloto:</strong> {selectedPilotEntry.pilot.generalPerfomance ? selectedPilotEntry.pilot.generalPerfomance.toFixed(4) : 'N/A'}</p>

                        <h3>Información del Vehículo:</h3>
                        {selectedPilotEntry.pilot.vehiculoId ? (
                            <>
                                <p><strong>Nombre del Vehículo:</strong> {selectedPilotEntry.pilot.vehiculoId.name}</p>
                                <p><strong>Equipo Vehículo:</strong> {selectedPilotEntry.pilot.vehiculoId.equipo}</p>
                                <p><strong>Velocidad Punta:</strong> {selectedPilotEntry.pilot.vehiculoId.velocidadPunta} km/h</p>
                                <p><strong>Fiabilidad Vehículo:</strong> {selectedPilotEntry.pilot.vehiculoId.fiabilidad}%</p>
                                <p><strong>Peso Vehículo:</strong> {selectedPilotEntry.pilot.vehiculoId.peso} kg</p>
                                <p><strong>Rendimiento Vehículo:</strong> {selectedPilotEntry.pilot.vehiculoId.vehiclePerfomance ? selectedPilotEntry.pilot.vehiculoId.vehiclePerfomance.toFixed(4) : 'N/A'}</p>
                            </>
                        ) : (
                            <p>No hay información de vehículo disponible.</p>
                        )}

                        <button onClick={handleClosePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictionComponent;