import React, { useState, useEffect } from 'react';
import { f1Teams } from '../../constants/f1Teams'; // Importa la lista de equipos

function VehicleForm({ initialValues, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        equipo: '',
        name: '',
        velocidadPunta: '',
        fiabilidad: '',
        peso: '',
    });

    useEffect(() => {
        if (initialValues) {
            const { _id, __v, ...initialDataWithoutMongo } = initialValues;
            setFormData(initialDataWithoutMongo);
        } else {
            setFormData({
                equipo: '',
                name: '',
                velocidadPunta: '',
                fiabilidad: '',
                peso: '',
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="vehicle-form">
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
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="velocidadPunta">Velocidad Punta:</label>
                <input type="number" id="velocidadPunta" name="velocidadPunta" value={formData.velocidadPunta} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="fiabilidad">Fiabilidad:</label>
                <input type="number" id="fiabilidad" name="fiabilidad" value={formData.fiabilidad} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="peso">Peso:</label>
                <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleChange} required />
            </div>

            <div className="form-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}

export default VehicleForm;