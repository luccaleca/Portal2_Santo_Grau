const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Para hashing de senha
const connectDB = require('../../config/database');
const jwt = require('jsonwebtoken'); // Para gerar token JWT


// Rota de cadastro
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const db = await connectDB();
        const query = "INSERT INTO TB_P2_USUARIOS (NOME, EMAIL, SENHA) VALUES (?, ?, ?)";

        db.query(query, [nome, email, hashedPassword], (err, result) => {
            db.detach();
            if (err) {
                res.status(500).json({ error: 'Erro ao registrar o usuário: ' + err.message });
            } else {
                res.status(201).send('Usuário cadastrado com sucesso!');
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor: ' + error.message });
    }
});


// Rota de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const db = await connectDB();
        const query = "SELECT USER_ID, NOME, EMAIL, SENHA FROM TB_P2_USUARIOS WHERE EMAIL = ?";

        db.query(query, [email], async (err, result) => {
            db.detach();
            if (err || result.length === 0) {
                res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta' });
                return;
            }
            
            const user = result[0];
            const passwordIsValid = await bcrypt.compare(senha, user.SENHA);

            if (!passwordIsValid) {
                res.status(401).json({ error: 'Senha incorreta' });
            } else {
                res.status(200).json({ message: 'Login bem-sucedido', user });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor: ' + error.message });
    }
});


module.exports = router;
