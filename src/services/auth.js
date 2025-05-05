import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';


export const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; // Si el registro es exitoso, el backend podría devolver algún dato
    } catch (error) {
      // Aquí puedes personalizar el manejo de errores
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message); // Propagar el mensaje de error del backend
      } else {
        throw new Error('Error al registrar el usuario. Inténtalo de nuevo.');
      }
    }
  };

  export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // Esperamos que el backend devuelva un token y/o información del usuario
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message); // Propagar el mensaje de error del backend
      } else {
        throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
  };