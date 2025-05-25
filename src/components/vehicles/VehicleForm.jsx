import React, { useState, useEffect } from 'react';
import { f1Teams } from '../../constants/f1Teams';
import './styles/VehicleForm.css';

function VehicleForm({ initialValues, onSubmit, onCancel }) {
    // 1. Estado inicial del formulario. No incluyas vehiclePerfomance aquí.
    const [formData, setFormData] = useState({
        equipo: '',
        name: '',
        velocidadPunta: '',
        fiabilidad: '',
        peso: '',
    });

    // 2. useEffect para inicializar el formulario con valores si se están editando
    useEffect(() => {
        if (initialValues) {
            // **LA LÍNEA CRÍTICA**
            // Desestructura initialValues para excluir _id, __v y vehiclePerfomance
            // Asegúrate de que 'vehiclePerfomance' tenga la capitalización EXACTA
            // como en tu esquema de Mongoose y los datos que recibes del backend.
            const { _id, __v, vehiclePerfomance, ...dataForForm } = initialValues;

            console.log('--- InitialValues recibidos:', initialValues); // Debug: ¿Qué trae initialValues?
            console.log('--- Data limpia para el formulario (después de exclusión):', dataForForm); // Debug: ¿Qué va al formData?

            // Establece el estado del formulario con los datos limpios
            setFormData(dataForForm);
        } else {
            // Si no hay initialValues (es un formulario de creación), reinicia el estado
            setFormData({
                equipo: '',
                name: '',
                velocidadPunta: '',
                fiabilidad: '',
                peso: '',
            });
        }
    }, [initialValues]); // Dependencia: re-ejecutar cuando initialValues cambien

    // 3. Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Asegúrate de convertir los valores numéricos a tipo Number
        // antes de enviarlos, ya que los inputs HTML devuelven strings.
        const dataToSend = {
            ...formData, // Usa el estado actual de formData
            velocidadPunta: Number(formData.velocidadPunta),
            fiabilidad: Number(formData.fiabilidad),
            peso: Number(formData.peso),
        };

        // **LA LÍNEA CLAVE PARA DEBUGGAR**
        // Este console.log te mostrará el objeto EXACTO que se pasará
        // a la función onSubmit (y de ahí al servicio y al backend).
        console.log('*** Datos FINALES a enviar a la función onSubmit:', dataToSend);

        // Llama a la función onSubmit (proporcionada por el componente padre)
        // con los datos del formulario ya procesados.
        onSubmit(dataToSend);
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
                    {/* f1Teams debería ser una lista de strings con los nombres de los equipos */}
                    {f1Teams.map(team => (
                        <option key={team} value={team}>
                            {team}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="velocidadPunta">Velocidad Punta:</label>
                <input
                    type="number"
                    id="velocidadPunta"
                    name="velocidadPunta"
                    value={formData.velocidadPunta}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="fiabilidad">Fiabilidad:</label>
                <input
                    type="number"
                    id="fiabilidad"
                    name="fiabilidad"
                    value={formData.fiabilidad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="peso">Peso:</label>
                <input
                    type="number"
                    id="peso"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}

export default VehicleForm;