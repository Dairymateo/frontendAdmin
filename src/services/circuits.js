import axios from 'axios';


const API_URL = 'https://frontendcore.onrender.com/circuits';


export const getAllCircuits = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error al cargar los circuitos. Inténtalo de nuevo.');
        }
    }
}


export const getCircuitById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error al cargar los detalles del circuito. Inténtalo de nuevo.');
        }
    }
};

export const createCircuit = async (circuitData, token) => {
    try {
        const response = await axios.post(API_URL, circuitData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error al crear el circuito. Inténtalo de nuevo.');
        }
    }
};

export const updateCircuit = async (id, circuitData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, circuitData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error al actualizar el circuito. Inténtalo de nuevo.');
        }
    }
};

export const deleteCircuit = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error al eliminar el circuito. Inténtalo de nuevo.');
        }
    }
};