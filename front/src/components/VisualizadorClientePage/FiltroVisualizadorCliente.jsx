import React from "react";

const Filtro = ({
  filtro,
  manipularAlteracaoDeFiltro,
  dataInicioCustomizada,
  manipularAlteracaoDeDataCustomizada,
  dataFimCustomizada,
  carregando,
  onFilterChange,
}) => {

  const handleConfirmarClick = () => {
    if (onFilterChange) {
      onFilterChange();
    }
  };

  return (
    <div className="filter-container">
      <div className="filter">
        <label htmlFor="filter">Filtrar por:</label>
        <select
          id="filter"
          value={filtro}
          onChange={(e) => manipularAlteracaoDeFiltro(e.target.value)}
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
            onChange={(e) =>
              manipularAlteracaoDeDataCustomizada(e.target.value, dataFimCustomizada)
            }
          />
          <label htmlFor="customEndDate">Até:</label>
          <input
            type="date"
            id="customEndDate"
            name="endDate"
            value={dataFimCustomizada}
            onChange={(e) =>
              manipularAlteracaoDeDataCustomizada(dataInicioCustomizada, e.target.value)
            }
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

export default Filtro;
