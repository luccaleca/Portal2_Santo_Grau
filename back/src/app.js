// src/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cardsIniciaisRoutes = require('./routes/dashboard/cardsIniciais');
const tabelaVendedoresRoutes = require('./routes/dashboard/tabelaVendedores');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS
app.use(cors());

// Middleware para parsing do JSON
app.use(express.json());

// Rotas
app.use('/api/dashboard/cardsIniciais', cardsIniciaisRoutes);
app.use('/api/dashboard/tabelaVendedores', tabelaVendedoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
