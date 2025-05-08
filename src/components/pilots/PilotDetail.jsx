import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as PilotService from '../../services/pilots';
import './styles/PilotDetail.css'; 

function PilotDetail() {
    const { id } = useParams();
    const [pilot, setPilot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPilot = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await PilotService.getPilotById(id); // Necesitas crear esta función en your pilot service
                setPilot(data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error al cargar los detalles del piloto.');
                setLoading(false);
            }
        };

        fetchPilot();
    }, [id]);

    if (loading) {
        return <div>Cargando detalles del piloto...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!pilot) {
        return <p>Piloto no encontrado.</p>;
    }

    return (
        <div className="pilot-detail-container">
            <h1>Detalles del Piloto</h1>
            <div className="pilot-info">
                <p><strong>Nombre:</strong> {pilot.name}</p>
                <p><strong>Equipo:</strong> {pilot.equipo}</p>
                <p><strong>Nacionalidad:</strong> {pilot.nacionalidad}</p>
                {pilot.promedioPosicionFinalGeneral && (
                    <p><strong>Promedio Posición Final General:</strong> {pilot.promedioPosicionFinalGeneral}</p>
                )}
                {pilot.porcentajeAbandonoGeneral && (
                    <p><strong>Porcentaje Abandono General:</strong> {pilot.porcentajeAbandonoGeneral}%</p>
                )}
                {pilot.vehiculo && (
                    <p>
                        <strong>Vehículo Asignado:</strong>
                        <Link to={`/vehicles/${pilot.vehiculo._id}`}>
                            {pilot.vehiculo.name} ({pilot.vehiculo.equipo})
                        </Link>
                    </p>
                )}
                {!pilot.vehiculoId && !pilot.vehiculo && (
                    <p><strong>Vehículo Asignado:</strong> No asignado</p>
                )}
            </div>
            <Link to="/pilots" className="back-to-list">Volver a la lista de pilotos</Link>
        </div>
    );
}

export default PilotDetail;