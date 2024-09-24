import React from "react";
import { useContextoDeDashboard } from "../../hooks/dashboard/useProvedorDeContexto";


const FiltroDashboard = ({ carregando }) => {
  const {
    filtro,
    manipularAlteracaoDeFiltro,
    dataInicioCustomizada,
    dataFimCustomizada,
    manipularAlteracaoDeDataCustomizada,
    manipularEnvioDeDataCustomizada,
  } = useContextoDeDashboard();

  const handleConfirmarClick = () => {
    console.log('Botão Confirmar clicado');
    manipularEnvioDeDataCustomizada();
  };

  console.log('Estado atual do filtro:', filtro);
  console.log('Estado atual das datas:', dataInicioCustomizada, dataFimCustomizada);

  return (
    <div className="filter-container">
      <div className="filter">
        <label htmlFor="filter">Filtrar por:</label>
        <select
          id="filter"
          value={filtro}
          onChange={(e) => {
            console.log('Selecionado novo filtro:', e.target.value);
            manipularAlteracaoDeFiltro(e.target.value);
          }}
        >
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
          <option value="year">Ano</option>
          <option value="custom">Personalizado</option>
        </select>
      </div>
      {filtro === "custom" && (
        <div className="custom-date-filter">
          <label htmlFor="customStartDate">De:</label>
          <input
            type="date"
            id="customStartDate"
            name="startDate"
            value={dataInicioCustomizada}
            onChange={(e) => {
              console.log('Alterando data de início para:', e.target.value);
              manipularAlteracaoDeDataCustomizada(e.target.value, dataFimCustomizada);
            }}
          />
          <label htmlFor="customEndDate">Até:</label>
          <input
            type="date"
            id="customEndDate"
            name="endDate"
            value={dataFimCustomizada}
            onChange={(e) => {
              console.log('Alterando data de fim para:', e.target.value);
              manipularAlteracaoDeDataCustomizada(dataInicioCustomizada, e.target.value);
            }}
          />
        </div>
      )}
      <button
        type="button"
        className="confirm-button"
        onClick={handleConfirmarClick}
        disabled={carregando}
      >
        {carregando ? "Carregando..." : "Confirmar"}
      </button>
    </div>
  );
};

export default FiltroDashboard;