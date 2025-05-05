import axios from "axios";

const API_URL = "http://localhost:3000/vehicles";


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