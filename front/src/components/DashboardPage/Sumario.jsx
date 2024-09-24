import React from "react";
import { useContextoDeDashboard } from "../../hooks/dashboard/useProvedorDeContexto";
import useSumario from "../../hooks/dashboard/useSumario";
import useFormatCurrency from "../../hooks/dashboard/useFormatCurrency";

import "react-sweet-progress/lib/style.css";
import "../../styles/dashboard/Sumario.css";

const Sumario = () => {
  const { dados } = useContextoDeDashboard();
  const { renderProgress } = useSumario();
  const { formatCurrency } = useFormatCurrency(); // Corrigido: desestruturação para obter formatCurrency

  if (!dados || !dados.sumario) {
    console.error("Dados para 'sumario' não estão disponíveis ou não existem.");
    return <div>Carregando dados...</div>;
  }

  const { total, whatsapp, homeOtica } = dados.sumario;

  return (
    <div className="info-container">
      <div className="card">
        <h1>Total</h1>
        <div>Receita total: {formatCurrency(total.VENDAS_TOTAIS)}</div>
        <div>Ticket Médio: {formatCurrency(total.TICKET_MEDIO_TOTAL)}</div>
        <div>Número de vendas: {total.NUM_VENDAS_TOTAIS ?? "Dado não disponível"}</div>
        {renderProgress(total.VENDAS_TOTAIS, total.META_TOTAL)}
      </div>

      <div className="card">
        <h1>WhatsApp</h1>
        <div>
          Receita total de vendas: {formatCurrency(whatsapp.VENDAS_TOTAIS)}
        </div>
        <div>Ticket Médio: {formatCurrency(whatsapp.TICKET_MEDIO_TOTAL)}</div>
        <div>Número de vendas: {whatsapp.NUM_VENDAS_TOTAIS ?? "Dado não disponível"}</div>
        {renderProgress(whatsapp.VENDAS_TOTAIS, whatsapp.META_WHATSAPP)}
      </div>

      <div className="card">
        <h1>Home Ótica</h1>
        <div>
          Receita total de vendas: {formatCurrency(homeOtica.VENDAS_TOTAIS)}
        </div>
        <div>Ticket Médio: {formatCurrency(homeOtica.TICKET_MEDIO_TOTAL)}</div>
        <div>Número de vendas: {homeOtica.NUM_VENDAS_TOTAIS ?? "Dado não disponível"}</div>
        {renderProgress(homeOtica.VENDAS_TOTAIS, homeOtica.META_HOMEOTICA)}
      </div>
    </div>
  );
};

export default Sumario;