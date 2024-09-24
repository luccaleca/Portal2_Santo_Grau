// src/hooks/useFetchClientes.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchClientes = (dataInicioCustomizada, dataFimCustomizada) => {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (dataInicioCustomizada && dataFimCustomizada) {
      fetchClientes();
    }
  }, [dataInicioCustomizada, dataFimCustomizada]);

  const fetchClientes = async () => {
    setCarregando(true);
    try {
      const response = await axios.get(
        `http://localhost:2222/api/visualizador-clientes/filtro`,
        {
          params: {
            dataInicio: dataInicioCustomizada,
            dataFim: dataFimCustomizada,
          },
        }
      );
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setCarregando(false);
    }
  };

  return {
    clientes,
    carregando,
  };
};

export default useFetchClientes;