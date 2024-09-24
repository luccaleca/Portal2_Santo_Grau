const express = require('express');
const router = express.Router();
const connectDB = require('../../config/database');

// Função para executar a query
const executeQuery = (db, query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                console.error("Erro na execução da query:", err); // Log do erro da query
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Rota para deletar uma promoção pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;  // Certifique-se de que o ID está sendo extraído corretamente
    console.log("ID recebido para deletar:", id); // Log para verificar o ID

    try {
        // Conecte-se ao banco de dados usando `await` para garantir que a conexão seja estabelecida corretamente
        const db = await connectDB();
        console.log("Conectado ao banco de dados"); // Log para verificar conexão

        // Verifica se a promoção existe
        const checkQuery = 'SELECT * FROM TB_P2_PROMOCOES WHERE ID = ?';
        const result = await executeQuery(db, checkQuery, [id]);

        if (result.length === 0) {
            console.log("Promoção não encontrada");
            db.detach();  // Fecha a conexão com o banco
            return res.status(404).json({ message: 'Promoção não encontrada.' });
        }

        console.log("Promoção encontrada:", result); // Log da promoção encontrada

        // Deleta a promoção
        const deleteQuery = 'DELETE FROM TB_P2_PROMOCOES WHERE ID = ?';
        await executeQuery(db, deleteQuery, [id]);
        console.log("Promoção deletada com sucesso!");

        db.detach();  // Fecha a conexão com o banco
        res.status(200).json({ message: 'Promoção deletada com sucesso!' });
    } catch (error) {
        console.error("Erro ao deletar promoção:", error); // Log do erro completo
        res.status(500).json({ message: "Erro ao deletar promoção", detalhes: error.message });
    }
});

module.exports = router;