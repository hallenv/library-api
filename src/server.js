import app from './app.js';
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`API de aluguel/depósito de livros disponível em http://localhost:${PORT}/api/books`);
    console.log("Página Pug disponível em: http://localhost:3000/books");
});