const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2222;

// Configuração dos middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware para servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads'))); 

// Importando as rotas
const authRoutes = require('./routes/auth/auth'); 

const filtrosDashboardRoutes = require('./routes/dashboard/filtros');
const filtrosVisualizadorClientesRoutes = require('./routes/visualizador-clientes/filtro');

const promocoesRouter = express.Router();
promocoesRouter.use('/', require('./routes/promocoes/adicionar-promo'));
promocoesRouter.use('/', require('./routes/promocoes/deletar-promo'));
promocoesRouter.use('/', require('./routes/promocoes/filtrar-promo'));;

// Configurando as rotas
app.use('/api/auth/', authRoutes); // Rota de autenticação para cadastro e login

app.use('/api/dashboard', filtrosDashboardRoutes);

app.use('/api/visualizador-clientes', filtrosVisualizadorClientesRoutes);

app.use('/api/promocoes', promocoesRouter);

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
