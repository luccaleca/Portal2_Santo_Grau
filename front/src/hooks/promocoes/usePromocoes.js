// hooks/usePromocoes.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePromocoes = () => {
    const [promocoes, setPromocoes] = useState([]);
    const [categoria, setCategoria] = useState('vigentes');
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [promocaoSelecionada, setPromocaoSelecionada] = useState(null);

    const fetchPromocoes = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:2222/api/promocoes?status=${categoria}`);
            setPromocoes(response.data);
        } catch (error) {
            console.error('Erro ao listar promoções:', error);
        }
    }, [categoria]);

    useEffect(() => {
        fetchPromocoes();
    }, [fetchPromocoes]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:2222/api/promocoes/${id}`);
            alert('Promoção deletada com sucesso!');
            setPromocoes(prevPromocoes => prevPromocoes.filter(promo => promo.ID !== id));
        } catch (error) {
            console.error('Erro ao deletar promoção:', error);
        }
    };

    const handlePromocaoAdicionada = () => {
        fetchPromocoes();
        toggleFormulario();
    };

    const toggleFormulario = () => {
        setExibirFormulario(!exibirFormulario);
    };

    const handleCategoriaChange = (novaCategoria) => {
        setCategoria(novaCategoria);
    };

    const abrirDetalhesPromocao = (promocao) => {
        setPromocaoSelecionada(promocao);
    };

    return {
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
    };
};

export default usePromocoes;