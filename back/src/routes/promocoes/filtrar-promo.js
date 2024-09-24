const express = require('express');
const router = express.Router();
const connectDB = require('../../config/database');

// Função para executar a query
const executeQuery = (db, query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Rota para listar promoções com base no status
router.get('/', async (req, res) => {
    const { status } = req.query;

    let query = 'SELECT * FROM TB_P2_PROMOCOES';
    let params = [];

    // Ajuste para promoções vigentes
    switch(status) {
        case 'vigentes':
            query += ' WHERE (STATUS = ? OR STATUS = ?) AND FIM >= CURRENT_DATE';
            params.push('vigente', 'ativa');
            break;
        case 'encerradas':
            query += ' WHERE STATUS = ? OR FIM < CURRENT_DATE';
            params.push('encerrada');
            break;
        case 'todas':
        default:
            // Não adiciona nenhuma condição WHERE, retorna todas as promoções
            break;
    }

    try {
        // Conectar ao banco de dados
        const db = await connectDB();
        
        // Executar a query com os parâmetros
        const promocoes = await executeQuery(db, query, params);
        
        // Fechar a conexão com o banco
        db.detach();

        // Retornar a lista de promoções
        res.status(200).json(promocoes);
    } catch (error) {
        console.error("Erro ao listar promoções:", error);
        res.status(500).json({ message: "Erro ao listar promoções" });
    }
});

module.exports = router;