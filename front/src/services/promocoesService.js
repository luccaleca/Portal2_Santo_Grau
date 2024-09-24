import axios from 'axios';
const API_URL = 'http://localhost:2222/api';

export const getPromocoes = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/promocoes`, {
            params: { status }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao listar promoções:', error);
        throw error;
    }
};

export const addPromocao = async (novaPromocao) => {
    try {
        const response = await axios.post(`${API_URL}/promocoes`, novaPromocao);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar promoção:', error);
        throw error;
    }
};

export const deletePromocao = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/promocoes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar promoção:', error);
        throw error;
    }
};
