import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
//import './styles/CircuitDetails.css'; // Make sure this CSS file exists
import * as CircuitService from "../../services/circuits"; // Ensure the path is correct

function CircuitDetails() {
    const { id } = useParams(); // Gets the 'id' from the URL parameter
    const [circuit, setCircuit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCircuitDetails = async () => {
            try {
                setLoading(true);
                const data = await CircuitService.getCircuitById(id);
                setCircuit(data);
                setLoading(false);
                setError(''); // Clear any previous errors
            } catch (err) {
                setError(err.message || 'Error al cargar los detalles del circuito. Por favor, inténtalo de nuevo más tarde.');
                setLoading(false);
            }
        };

        if (id) {
            fetchCircuitDetails();
        }
    }, [id]); // Depend on 'id' to refetch if the ID changes

    if (loading) {
        return <div className="circuit-details-loading">Cargando detalles del circuito...</div>;
    }

    if (error) {
        return <p className="circuit-details-error-message">{error}</p>;
    }

    if (!circuit) {
        return <div className="circuit-details-not-found">Circuito no encontrado.</div>;
    }

    return (
        <div className="circuit-details-container">
            <h2>Detalles del Circuito</h2>
            <h3>{circuit.name}</h3>
            {/* You can add an image here if circuit data includes a URL */}
            {/* {circuit.image && (
                <div className="circuit-image-wrapper">
                    <img src={circuit.image} alt={circuit.name} className="circuit-detail-image" />
                </div>
            )} */}
            <p><strong>Ubicación:</strong> {circuit.ubication}</p>
            <p><strong>Temperatura:</strong> {circuit.temperature} °C</p>
            <p><strong>Tipo de Circuito:</strong> {circuit.tipoCircuito}</p>
            <p><strong>Cantidad de Curvas:</strong> {circuit.cantidadCurvas}</p>
            <p><strong>% Accidentes Histórico:</strong> {circuit.porcentajeAccidentesHistorico}%</p>
            <p><strong>Longitud Recta Más Larga:</strong> {circuit.longitudRectaMasLargaKm} km</p>
            <p><strong>Cambio de Elevación:</strong> {circuit.cambioElevacionMetros} metros</p>
            {/* Show difficulty only if it exists in the data (calculated by backend) */}
            {circuit.dificultadCircuito && (
                <p><strong>Dificultad:</strong> {circuit.dificultadCircuito} / 10</p>
            )}

            <Link to="/circuits" className="back-button">
                Volver a la lista de circuitos
            </Link>
        </div>
    );
}

export default CircuitDetails;