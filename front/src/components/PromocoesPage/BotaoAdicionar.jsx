import React from 'react';
import '../../styles/promocoes/BotaoAdicionar.css';

const BotaoAdicionar = ({ onClick }) => {
    return (
        <button className="adicionar-promocao-btn" onClick={onClick}>
            Adicionar Promoção
        </button>
    );
};

export default BotaoAdicionar;
