import axios from 'axios';
const API_URL = 'http://localhost:2222/api';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        throw error;
    }
};

export const cadastro = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/cadastro`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao realizar cadastro:', error);
        throw error;
    }
};
