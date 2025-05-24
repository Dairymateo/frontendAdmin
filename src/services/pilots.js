import axios from 'axios';

const API_URL = 'http://localhost:3000/pilots'

export const getAllPilots = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Error al cargar los pilotos.';
    }
};

export const createPilot = async (pilotData, token) => {
    try {
        const response = await axios.post(API_URL, pilotData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Error al crear el piloto.';
    }
};

export const updatePilot = async (id, pilotData, token, method = 'PATCH') => {
    try {
        const response = await axios({
            method: method,
            url: `${API_URL}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: pilotData,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Error al actualizar el piloto.';
    }
};

export const deletePilot = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Error al eliminar el piloto.';
    }
};

export const getPilotById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Error al cargar los detalles del piloto.';
    }
};