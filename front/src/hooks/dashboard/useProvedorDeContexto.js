import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProvedorDeContexto = createContext();

export const useContextoDeDashboard = () => useContext(ProvedorDeContexto);

export const ProvedorDeDashboard = ({ children }) => {
  const [dados, setDados] = useState({});
  const [filtro, setFiltro] = useState('week');
  const [dataInicioCustomizada, setDataInicioCustomizada] = useState('');
  const [dataFimCustomizada, setDataFimCustomizada] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Estados temporários para armazenar as seleções até a confirmação
  const [filtroTemp, setFiltroTemp] = useState(filtro);
  const [dataInicioTemp, setDataInicioTemp] = useState(dataInicioCustomizada);
  const [dataFimTemp, setDataFimTemp] = useState(dataFimCustomizada);

  const fetchData = async (filtro, dataInicio, dataFim) => {
    setCarregando(true);
    try {
      const response = await axios.get('http://localhost:2222/api/dashboard', {
        params: {
          filtro,
          dataInicioCustomizada: dataInicio,
          dataFimCustomizada: dataFim,
        },
      });
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar os dados do dashboard:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    // Carregar dados iniciais
    fetchData(filtro, dataInicioCustomizada, dataFimCustomizada);
  }, []);

  const manipularAlteracaoDeFiltro = (novoFiltro) => {
    setFiltroTemp(novoFiltro);
  };

  const manipularAlteracaoDeDataCustomizada = (dataInicio, dataFim) => {
    setDataInicioTemp(dataInicio);
    setDataFimTemp(dataFim);
  };

  const manipularEnvioDeDataCustomizada = () => {
    setFiltro(filtroTemp);
    setDataInicioCustomizada(dataInicioTemp);
    setDataFimCustomizada(dataFimTemp);
    fetchData(filtroTemp, dataInicioTemp, dataFimTemp);
  };

  return (
    <ProvedorDeContexto.Provider
      value={{
        dados,
        carregando,
        filtro: filtroTemp,
        dataInicioCustomizada: dataInicioTemp,
        dataFimCustomizada: dataFimTemp,
        manipularAlteracaoDeFiltro,
        manipularAlteracaoDeDataCustomizada,
        manipularEnvioDeDataCustomizada
      }}
    >
      {children}
    </ProvedorDeContexto.Provider>
  );
};