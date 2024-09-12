const express = require('express');
const router = express.Router();
const connectDB = require('../../config/database');

// Função para executar a query
const executeQuery = async (query, params) => {
    try {
        const db = await connectDB();
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                db.detach();  // Desconecta do banco após a operação
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error; // Propaga o erro para ser tratado no catch do endpoint
    }
};

// Rota para o filtro do visualizador de clientes
router.get('/visualizador_clientes/filtro', async (req, res) => {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
        return res.status(400).json({ message: "Datas de início e fim são obrigatórias" });
    }

    try {
        const query = `
  SELECT DISTINCT
    b.PESDTCADASTRO AS DATA_CADASTRO,
    b.PESNOME,
    d.TELDDD,
    d.TELNUMERO,
    c.INTENDERECO
  FROM TB_CLI_CLIENTE a
  INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID
  INNER JOIN TB_INT_INTERNET c ON c.PESID = b.PESID
  INNER JOIN TB_TEL_TELEFONE d ON d.PESID = b.PESID
  WHERE d.TELTIPO = 'C'
    AND d.TELDDD > '0'
    AND b.PESDTCADASTRO BETWEEN ? AND ?
  ORDER BY b.PESDTCADASTRO ASC
`;
        const clientes = await executeQuery(query, [dataInicio, dataFim]);
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
});

module.exports = router;
