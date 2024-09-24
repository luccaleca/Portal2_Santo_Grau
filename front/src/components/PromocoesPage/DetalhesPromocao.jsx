// ../components/PromocoesPage/DetalhesPromocao.jsx
import React from 'react';

const DetalhesPromocao = ({ promocao, onDelete }) => (
    <div className="promocao-detalhes">
        <h2>{promocao.TITULO}</h2>
        <p>{promocao.DESCRICAO}</p>
        <p>De: {promocao.VALOR_ANTIGO} Por: {promocao.VALOR_NOVO}</p>
        <p>Início: {promocao.INICIO}</p>
        <p>Fim: {promocao.FIM}</p>
        <button onClick={() => onDelete(promocao.ID)}>Deletar Promoção</button>
    </div>
);

export default DetalhesPromocao;