import axios from 'axios';
const API_URL = 'http://localhost:2222/api';

export const getDashboardData = async (filtro, dataInicioCustomizada, dataFimCustomizada) => {
    try {
        const response = await axios.get(`${API_URL}/dashboard`, {
            params: { filtro, dataInicioCustomizada, dataFimCustomizada }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do dashboard:', error);
        throw error;
    }
};
