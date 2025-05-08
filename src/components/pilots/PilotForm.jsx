import React, { useState, useEffect } from 'react';
import * as VehicleService from "../../services/vehicles";
import { f1Teams } from '../../constants/f1Teams'; // Importa la lista de equipos

function PilotForm({ initialValues, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        equipo: '',
        nacionalidad: '',
        promedioPosicionFinalGeneral: '',
        porcentajeAbandonoGeneral: '',
        vehiculoId: '',
    });
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState('');

    useEffect(() => {
        if (initialValues) {
            const { _id, __v, ...initialDataWithoutMongo } = initialValues;
            setFormData(initialDataWithoutMongo);
        } else {
            setFormData({
                name: '',
                equipo: '',
                nacionalidad: '',
                promedioPosicionFinalGeneral: '',
                porcentajeAbandonoGeneral: '',
                vehiculoId: '',
            });
        }
    }, [initialValues]);

    useEffect(() => {
        const fetchVehiclesByTeam = async () => {
            setLoadingVehicles(true);
            setErrorVehicles('');
            try {
                const vehicles = await VehicleService.getAllVehicles();
                const teamVehicles = formData.equipo
                    ? vehicles.filter(v => v.equipo === formData.equipo)
                    : [];
                setAvailableVehicles(teamVehicles);
                setLoadingVehicles(false);
            } catch (error) {
                setErrorVehicles(error.message || 'Error al cargar los vehículos.');
                setLoadingVehicles(false);
            }
        };

        if (!initialValues || formData.equipo) {
            fetchVehiclesByTeam();
        }
    }, [formData.equipo, initialValues]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = {
            ...formData,
            promedioPosicionFinalGeneral: formData.promedioPosicionFinalGeneral ? Number(formData.promedioPosicionFinalGeneral) : null,
            porcentajeAbandonoGeneral: formData.porcentajeAbandonoGeneral ? Number(formData.porcentajeAbandonoGeneral) : null,
        };
        onSubmit(formDataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="pilot-form">
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="equipo">Equipo:</label>
                <select
                    id="equipo"
                    name="equipo"
                    value={formData.equipo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar equipo</option>
                    {f1Teams.map(team => (
                        <option key={team} value={team}>
                            {team}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="nacionalidad">Nacionalidad:</label>
                <input type="text" id="nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="promedioPosicionFinalGeneral">Promedio Posición Final:</label>
                <input type="number" id="promedioPosicionFinalGeneral" name="promedioPosicionFinalGeneral" value={formData.promedioPosicionFinalGeneral} onChange={handleChange} min="1" max="20" />
            </div>
            <div className="form-group">
                <label htmlFor="porcentajeAbandonoGeneral">Porcentaje Abandono:</label>
                <input type="number" id="porcentajeAbandonoGeneral" name="porcentajeAbandonoGeneral" value={formData.porcentajeAbandonoGeneral} onChange={handleChange} min="0" max="100" />
            </div>

            <div className="form-group">
                <label htmlFor="vehiculoId">Vehículo:</label>
                {loadingVehicles ? (
                    <p>Cargando vehículos...</p>
                ) : errorVehicles ? (
                    <p className="error-message">{errorVehicles}</p>
                ) : (
                    <select
                        id="vehiculoId"
                        name="vehiculoId"
                        value={formData.vehiculoId}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar vehículo</option>
                        {availableVehicles.map(vehicle => (
                            <option key={vehicle._id} value={vehicle._id}>
                                {vehicle.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="form-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}

export default PilotForm;