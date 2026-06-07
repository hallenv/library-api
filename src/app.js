import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRoutes from './routes/book.routes.js';
import authorRoutes from './routes/author.routes.js';
import authRoutes from './routes/auth.routes.js';
import { listBooksView } from './controllers/book.controller.js';
import { globalErrorHandler } from './validators/error.middleware.js';
import { authenticate } from './validators/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

// rotas pub para auth
app.use('/api/auth', authRoutes);

// rota pub - ver livros
app.get('/books', listBooksView);

// rotas privadas - requer auth 
app.use('/api/books', authenticate, bookRoutes);
app.use('/api/authors', authenticate, authorRoutes);

app.use(globalErrorHandler);

export default app;