import React from "react";
import Sumario from "../components/DashboardPage/Sumario";
import Podium3Melhores from "../components/DashboardPage/Podium3Melhores";
import FiltroDashboard from "../components/DashboardPage/FiltroDashboard";
import TabelaVendedores from "../components/DashboardPage/TabelaVendedores";
import { ProvedorDeDashboard, useContextoDeDashboard } from "../hooks/dashboard/useProvedorDeContexto";
import Voltar from "../components/Global/Voltar";
import "../styles/dashboard/Dashboard.css";

const DashboardContent = () => {
  const { dados, carregando } = useContextoDeDashboard();

  return (
    <div className="dashboard-page">
      <header>
        <div className="title">DASHBOARD DE VENDAS</div>
        <Voltar />
        <FiltroDashboard carregando={carregando} />
      </header>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Sumario dados={dados.sumario} />
          <div className="horizontal-container">
            <Podium3Melhores dados={dados.podium} />
          </div>
          <TabelaVendedores dados={dados.vendedores} />
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <ProvedorDeDashboard>
      <DashboardContent />
    </ProvedorDeDashboard>
  );
};

export default Dashboard;