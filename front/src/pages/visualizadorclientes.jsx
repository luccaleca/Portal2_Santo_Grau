import React from "react";
import Voltar from "../components/Global/Voltar";
import Filtro from "../components/VisualizadorClientePage/FiltroVisualizadorCliente";

import useFiltroClientes from '../hooks/visualizadorClientes/useFiltroClientes';
import useFetchClientes from '../hooks/visualizadorClientes/useFetchClientes';

import "../styles/visualizadorCliente/VisualizadorClientes.css";

const VisualizadorClientes = () => {
  const {
    filtro,
    setFiltro,
    dataInicioCustomizada,
    setDataInicioCustomizada,
    dataFimCustomizada,
    setDataFimCustomizada,
  } = useFiltroClientes();

  const { clientes, carregando } = useFetchClientes(
    dataInicioCustomizada,
    dataFimCustomizada
  );

  const handleFiltroChange = (novoFiltro) => {
    setFiltro(novoFiltro);
  };

  const handleDataInicioChange = (dataInicio) => {
    setDataInicioCustomizada(dataInicio);
  };

  const handleDataFimChange = (dataFim) => {
    setDataFimCustomizada(dataFim);
  };

  const handleConfirmarClick = () => {
    // A chamada ao fetchClientes agora é feita automaticamente pelo useEffect no hook
  };

  const formatData = (data) => new Date(data).toLocaleDateString('pt-BR');

  return (
    <div className="visualizador-clientes-page content-container">
      <header>
        <Voltar />
        <div className="title">VISUALIZADOR DE CLIENTES</div>
        <Filtro
          filtro={filtro}
          manipularAlteracaoDeFiltro={handleFiltroChange}
          dataInicioCustomizada={dataInicioCustomizada}
          manipularAlteracaoDeDataCustomizada={handleDataInicioChange}
          dataFimCustomizada={dataFimCustomizada}
          onFilterChange={handleConfirmarClick}
        />
      </header>
      <div className="table-container">
        <h2>Lista de Clientes</h2>
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço de Email</th>
                <th>Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length ? (
                clientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.PESNOME}</td>
                    <td>{cliente.TELNUMERO}</td>
                    <td>{cliente.INTENDERECO}</td>
                    <td>{formatData(cliente.DATA_CADASTRO)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhum cliente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VisualizadorClientes;