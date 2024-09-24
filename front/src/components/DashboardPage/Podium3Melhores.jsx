import React from 'react';
import usePodium3Melhores from '../../hooks/dashboard/usePodium3Melhores';
import '../../styles/dashboard/Podium3Melhores.css';

const Podium3Melhores = () => {
  const { podiumData, formatCurrency } = usePodium3Melhores();

  if (podiumData.length === 0) {
    return <div>Nenhum dado disponível</div>;
  }

  return (
    <div className="podium-wrapper">
      <div className="podium-container">
        {podiumData.map((vendedor, index) => (
          <div
            key={index}
            className={`podium-step ${
              index === 0
                ? 'first-place'
                : index === 1
                ? 'second-place'
                : 'third-place'
            }`}
          >
            <div className="podium-rank">{`${index + 1}º Lugar`}</div>
            <div className="podium-vendedor">{vendedor.VENDEDOR}</div>
            <div className="podium-info">
              Vendas: {formatCurrency(vendedor.VENDAS)}
            </div>
            <div className="podium-info">
              Meta: {formatCurrency(vendedor.META)}
            </div>
            <div className="podium-info">
              Ticket Médio: {formatCurrency(vendedor.TM)}
            </div>
            <div className="podium-info">
              Número de Vendas: {vendedor.NUM_VENDAS}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podium3Melhores;