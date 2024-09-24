import axios from 'axios';

const API_URL = 'http://localhost:2222/api';

export const getClientesData = async (dataInicio, dataFim) => {
    try {
        const response = await axios.get(`${API_URL}/visualizador-clientes/filtro`, {
            params: { dataInicio, dataFim }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados dos clientes:', error);
        throw error;
    }
};