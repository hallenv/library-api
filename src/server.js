import app from './app.js';
import { client } from './data/db.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`API de aluguel/depósito de livros disponível em http://localhost:${PORT}/api/books`);
    console.log(`Página Pug disponível em: http://localhost:${PORT}/books`);
});

const shutdown = async () => {
    console.log('Fechando conexão com o banco de dados...');
    await client.close();
    server.close(() => {
        console.log('Servidor finalizado.');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
