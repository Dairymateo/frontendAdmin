// src/components/circuits/CircuitForm.jsx
import React, { useState, useEffect } from 'react';
import './styles/CircuitForm.css';

const circuitTypes = [
    'Street Circuit',
    'Permanent Circuit',
    'Semi-Permanent Circuit',
    'Hybrid Circuit'
];

function CircuitForm({ initialValues, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        ubication: '',
        temperature: '',
        tipoCircuito: '',
        cantidadCurvas: '',
        porcentajeAccidentesHistorico: '',
        longitudRectaMasLargaKm: '',
        cambioElevacionMetros: '',
    });

    useEffect(() => {
        if (initialValues) {
            const { _id, __v, dificultadCircuito, ...dataToLoad } = initialValues;
            setFormData(dataToLoad);
        } else {
            setFormData({
                name: '',
                ubication: '',
                temperature: '',
                tipoCircuito: '',
                cantidadCurvas: '',
                porcentajeAccidentesHistorico: '',
                longitudRectaMasLargaKm: '',
                cambioElevacionMetros: '',
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = {
            ...formData,
            temperature: formData.temperature ? Number(formData.temperature) : null,
            cantidadCurvas: formData.cantidadCurvas ? Number(formData.cantidadCurvas) : null,
            porcentajeAccidentesHistorico: formData.porcentajeAccidentesHistorico ? Number(formData.porcentajeAccidentesHistorico) : null,
            longitudRectaMasLargaKm: formData.longitudRectaMasLargaKm ? Number(formData.longitudRectaMasLargaKm) : null,
            cambioElevacionMetros: formData.cambioElevacionMetros ? Number(formData.cambioElevacionMetros) : null,
        };

        onSubmit(formDataToSend);
    };

    const isEditing = !!initialValues && !!initialValues._id;

    return (
        <form onSubmit={handleSubmit} className="circuit-form">
            <h3 className="circuit-form-title">
                {isEditing ? 'Edit Circuit' : 'Add New Circuit'}
            </h3>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Circuit Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Monaco Grand Prix"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ubication">Location:</label>
                    <input
                        type="text"
                        id="ubication"
                        name="ubication"
                        value={formData.ubication}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Monte Carlo, Monaco"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="temperature">Temperature (°C):</label>
                    <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        required
                        min="-10"
                        max="60"
                        placeholder="25"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoCircuito">Circuit Type:</label>
                    <select
                        id="tipoCircuito"
                        name="tipoCircuito"
                        value={formData.tipoCircuito}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select circuit type</option>
                        {circuitTypes.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="cantidadCurvas">Number of Turns:</label>
                    <input
                        type="number"
                        id="cantidadCurvas"
                        name="cantidadCurvas"
                        value={formData.cantidadCurvas}
                        onChange={handleChange}
                        required
                        min="1"
                        max="500"
                        placeholder="19"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="porcentajeAccidentesHistorico">Accident Rate (%):</label>
                    <input
                        type="number"
                        id="porcentajeAccidentesHistorico"
                        name="porcentajeAccidentesHistorico"
                        value={formData.porcentajeAccidentesHistorico}
                        onChange={handleChange}
                        required
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="15.5"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="longitudRectaMasLargaKm">Longest Straight (km):</label>
                    <input
                        type="number"
                        id="longitudRectaMasLargaKm"
                        name="longitudRectaMasLargaKm"
                        value={formData.longitudRectaMasLargaKm}
                        onChange={handleChange}
                        required
                        min="0"
                        max="5"
                        step="0.01"
                        placeholder="1.2"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cambioElevacionMetros">Elevation Change (m):</label>
                    <input
                        type="number"
                        id="cambioElevacionMetros"
                        name="cambioElevacionMetros"
                        value={formData.cambioElevacionMetros}
                        onChange={handleChange}
                        required
                        min="0"
                        max="500"
                        placeholder="42"
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    {isEditing ? 'Update Circuit' : 'Create Circuit'}
                </button>
                <button type="button" onClick={onCancel} className="cancel-btn">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CircuitForm;