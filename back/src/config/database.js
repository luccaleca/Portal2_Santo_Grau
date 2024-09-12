const Firebird = require('node-firebird');
const dotenv = require('dotenv');

dotenv.config();

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    role: null,
    pageSize: 4096
};

// Função de conexão usando async/await
const connectDB = () => {
    return new Promise((resolve, reject) => {
        Firebird.attach(options, (err, db) => {
            if (err) {
                console.error('Erro ao conectar ao Firebird:', err);
                reject(err);
            } else {
                console.log('Conexão com o banco de dados estabelecida com sucesso');
                resolve(db);
            }
        });
    });
};

module.exports = connectDB;
