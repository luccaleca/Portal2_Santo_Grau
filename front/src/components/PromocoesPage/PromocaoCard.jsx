// PromocaoCard.jsx
import React from 'react';

const PromocaoCard = ({ promocao, onClick }) => {
  const formatarPreco = (valor) => {
    return typeof valor === 'number' ? valor.toFixed(2) : '0.00';
  };

  return (
    <div className="promocao-card" onClick={() => onClick(promocao)}>
      <div className="promocao-image" style={{ backgroundImage: `url(${promocao.imagemUrl})` }}>
      </div>
      <div className="promocao-overlay">
        <h3>{promocao.TITULO}</h3>
        <div className="promocao-prices">
          <span className="old-price">R$ {formatarPreco(promocao.VALOR_ANTIGO)}</span>
          <span className="new-price">R$ {formatarPreco(promocao.VALOR_NOVO)}</span>
        </div>
      </div>
    </div>
  );
};

export default PromocaoCard;