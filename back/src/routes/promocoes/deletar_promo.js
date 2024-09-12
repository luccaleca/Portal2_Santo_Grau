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

// Rota para deletar uma promoção pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        connectDB(async (db) => {
            const query = 'DELETE FROM TB_P2_PROMOCOES WHERE ID = ?';
            await executeQuery(db, query, [id]);
            res.status(200).json({ message: 'Promoção deletada com sucesso!' });
        });
    } catch (error) {
        console.error("Erro ao deletar promoção:", error);
        res.status(500).json({ message: "Erro ao deletar promoção" });
    }
});

module.exports = router;
