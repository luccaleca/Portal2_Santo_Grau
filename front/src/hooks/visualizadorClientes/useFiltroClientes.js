// src/hooks/useFiltroClientes.js
import { useState, useEffect } from 'react';

const useFiltroClientes = () => {
  const [filtro, setFiltro] = useState('day');
  const [dataInicioCustomizada, setDataInicioCustomizada] = useState('');
  const [dataFimCustomizada, setDataFimCustomizada] = useState('');

  useEffect(() => {
    if (filtro !== 'custom') {
      const hoje = new Date();
      let dataInicio, dataFim;

      switch (filtro) {
        case 'day':
          dataInicio = hoje.toISOString().split('T')[0];
          dataFim = dataInicio;
          break;
        case 'week':
          dataFim = hoje.toISOString().split('T')[0];
          dataInicio = new Date(hoje.setDate(hoje.getDate() - 7))
            .toISOString()
            .split('T')[0];
          break;
        case 'month':
          dataFim = hoje.toISOString().split('T')[0];
          dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1))
            .toISOString()
            .split('T')[0];
          break;
        case 'year':
          dataFim = hoje.toISOString().split('T')[0];
          dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 1))
            .toISOString()
            .split('T')[0];
          break;
        default:
          break;
      }

      setDataInicioCustomizada(dataInicio);
      setDataFimCustomizada(dataFim);
    }
  }, [filtro]);

  return {
    filtro,
    setFiltro,
    dataInicioCustomizada,
    setDataInicioCustomizada,
    dataFimCustomizada,
    setDataFimCustomizada,
  };
};

export default useFiltroClientes;