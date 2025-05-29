import axios from "axios";

const API_URL = "https://coreweb.onrender.com/vehicles";


export const getAllVehicles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al cargar los vehículos. Inténtalo de nuevo.");
        }
    }
};


export const getVehicleById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al cargar los detalles del vehículo. Inténtalo de nuevo.");
        }
    }
};

export const createVehicle = async (vehicleData, token) => {
    try {
        const response = await axios.post(API_URL, vehicleData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al crear el vehículo. Inténtalo de nuevo.");
        }
    }
};

export const updateVehicle = async (id, vehicleData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, vehicleData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al actualizar el vehículo. Inténtalo de nuevo.");
        }
    }
};

export const deleteVehicle = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al eliminar el vehículo. Inténtalo de nuevo.");
        }
    }
};