import React, { useRef } from 'react';
import AdicionarPromocao from '../components/PromocoesPage/AdicionarPromocao';
import BotaoAdicionar from '../components/PromocoesPage/BotaoAdicionar';
import Modal from '../components/PromocoesPage/ModalPromocao';
import Voltar from '../components/Global/Voltar';
import PromocaoCard from '../components/PromocoesPage/PromocaoCard'; 
import DetalhesPromocao from '../components/PromocoesPage/DetalhesPromocao'; 
import '../styles/promocoes/Promocoes.css';

import usePromocoes from '../hooks/promocoes/usePromocoes';

const Promocoes = () => {
    const {
        promocoes,
        categoria,
        exibirFormulario,
        promocaoSelecionada,
        handleDelete,
        handlePromocaoAdicionada,
        toggleFormulario,
        handleCategoriaChange,
        abrirDetalhesPromocao,
        setPromocaoSelecionada
    } = usePromocoes();

    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { current } = sliderRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="promocoes-container">
            <Voltar />
            <h1>Catálogo de Promoções</h1>

            <BotaoAdicionar onClick={toggleFormulario} />

            <div className="botoes-categoria">
                <button onClick={() => handleCategoriaChange('vigentes')} className={categoria === 'vigentes' ? 'ativo' : ''}>
                    Promoções Vigentes
                </button>
                <button onClick={() => handleCategoriaChange('encerradas')} className={categoria === 'encerradas' ? 'ativo' : ''}>
                    Promoções Encerradas
                </button>
                <button onClick={() => handleCategoriaChange('todas')} className={categoria === 'todas' ? 'ativo' : ''}>
                    Todas as Promoções
                </button>
            </div>

            <div className="promocoes-row">
                <h2 className="promocoes-row-title">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
                <button className="scroll-button scroll-left" onClick={() => scroll('left')}>&#8249;</button>
                <div className="promocoes-slider" ref={sliderRef}>
                    {promocoes.length === 0 ? (
                        <p>Nenhuma promoção encontrada.</p>
                    ) : (
                        promocoes.map(promo => (
                            <PromocaoCard 
                                key={promo.ID} 
                                promocao={promo} 
                                onClick={() => abrirDetalhesPromocao(promo)}
                            />
                        ))
                    )}
                </div>
                <button className="scroll-button scroll-right" onClick={() => scroll('right')}>&#8250;</button>
            </div>

            <Modal isOpen={exibirFormulario} onClose={toggleFormulario}>
                <AdicionarPromocao onPromocaoAdicionada={handlePromocaoAdicionada} />
            </Modal>

            {promocaoSelecionada && (
                <Modal isOpen={true} onClose={() => setPromocaoSelecionada(null)}>
                    <DetalhesPromocao 
                        promocao={promocaoSelecionada} 
                        onDelete={handleDelete}
                        onClose={() => setPromocaoSelecionada(null)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Promocoes;