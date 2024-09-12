const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connectDB = require('../../config/database');

const router = express.Router();

// Verifica e cria a pasta de uploads, se necessário
const uploadDir = path.join(__dirname, '../../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer para salvar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Função para executar a query
const executeQuery = (db, query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Rota para adicionar uma nova promoção com upload de imagem
router.post('/adicionar', upload.single('imagem'), async (req, res) => {
    const { titulo, descricao, valorAntigo, valorNovo, inicio, fim, status } = req.body;
    try {
        const db = await connectDB();
        const imagemUrl = `/uploads/${req.file.filename}`;
        const query = `
            INSERT INTO TB_P2_PROMOCOES (TITULO, DESCRICAO, IMAGEM, VALOR_ANTIGO, VALOR_NOVO, INICIO, FIM, STATUS)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [titulo, descricao, imagemUrl, valorAntigo, valorNovo, inicio, fim, status];

        console.log("Executando consulta SQL:", query);
        console.log("Parâmetros:", params);

        await executeQuery(db, query, params);
        db.detach();  // Desanexa a conexão após a operação
        res.status(201).json({ message: 'Promoção adicionada com sucesso!', imagemUrl });
    } catch (error) {
        console.error("Erro ao adicionar promoção:", error);
        res.status(500).json({ message: "Erro ao adicionar promoção", detalhes: error.message });
    }
});

module.exports = router;
