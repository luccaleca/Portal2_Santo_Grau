import React, { useState } from 'react';
import axios from 'axios';

const AdicionarPromocao = ({ onPromocaoAdicionada }) => {
    const [novaPromocao, setNovaPromocao] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        valorAntigo: '',
        valorNovo: '',
        inicio: '',
        fim: ''
    });

    const [imagemFile, setImagemFile] = useState(null); // Para armazenar o arquivo de imagem

    const formatCurrency = (value) => {
        const formattedValue = value.replace(/\D/g, '')
                                    .replace(/(\d)(\d{2})$/, '$1,$2')
                                    .replace(/(?=(\d{3})+(\D))\B/g, '.');
        return `R$ ${formattedValue}`;
    };

    const handleValorAntigoChange = (e) => {
        setNovaPromocao({ ...novaPromocao, valorAntigo: formatCurrency(e.target.value) });
    };

    const handleValorNovoChange = (e) => {
        setNovaPromocao({ ...novaPromocao, valorNovo: formatCurrency(e.target.value) });
    };

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        setImagemFile(file);
        previewImagem(file);
    };

    const previewImagem = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setNovaPromocao({ ...novaPromocao, imagem: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImagemFile(file);
        previewImagem(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const adicionarPromocao = async (e) => {
        e.preventDefault();
        
        // Se houver um arquivo de imagem, precisamos fazer o upload dele antes
        if (imagemFile) {
            const formData = new FormData();
            formData.append('imagem', imagemFile);
            try {
                const uploadResponse = await axios.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setNovaPromocao({ ...novaPromocao, imagem: uploadResponse.data.imageUrl });
            } catch (error) {
                console.error("Erro ao fazer upload da imagem:", error);
                return;
            }
        }

        // Agora que a imagem foi enviada, enviamos os dados da promoção
        axios.post('/api/promocoes', novaPromocao)
            .then(response => {
                onPromocaoAdicionada();
                setNovaPromocao({
                    titulo: '',
                    descricao: '',
                    imagem: '',
                    valorAntigo: '',
                    valorNovo: '',
                    inicio: '',
                    fim: ''
                });
                setImagemFile(null); // Reseta o arquivo de imagem
            })
            .catch(error => console.error("Erro ao adicionar promoção:", error));
    };

    return (
        <div className="promocoes-container">
            <h1>Promoções Vigentes</h1>

            <form onSubmit={adicionarPromocao} className="form-nova-promocao">
                <input
                    type="text"
                    placeholder="Título da Promoção"
                    value={novaPromocao.titulo}
                    onChange={(e) => setNovaPromocao({ ...novaPromocao, titulo: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Descrição da Promoção"
                    value={novaPromocao.descricao}
                    onChange={(e) => setNovaPromocao({ ...novaPromocao, descricao: e.target.value })}
                    required
                />
                
                <div
                    className="upload-area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagemChange}
                    />
                    {novaPromocao.imagem && (
                        <img src={novaPromocao.imagem} alt="Pré-visualização" className="preview-image" />
                    )}
                    <p>Arraste uma imagem aqui ou clique para selecionar</p>
                </div>
                
                <input
                    type="text"
                    placeholder="Valor Antigo"
                    value={novaPromocao.valorAntigo}
                    onChange={handleValorAntigoChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Valor Novo"
                    value={novaPromocao.valorNovo}
                    onChange={handleValorNovoChange}
                    required
                />
                <input
                    type="date"
                    placeholder="Início da Promoção"
                    value={novaPromocao.inicio}
                    onChange={(e) => setNovaPromocao({ ...novaPromocao, inicio: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Fim da Promoção"
                    value={novaPromocao.fim}
                    onChange={(e) => setNovaPromocao({ ...novaPromocao, fim: e.target.value })}
                    required
                />
                <button type="submit" className="adicionar-promocao-btn">Adicionar Promoção</button>
            </form>
        </div>
    );
};

export default AdicionarPromocao;
