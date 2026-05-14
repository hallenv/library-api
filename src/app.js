import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRoutes from './routes/book.routes.js';
import authorRoutes from './routes/author.routes.js';
import { listBooksView } from './controllers/book.controller.js';
import { globalErrorHandler } from './validators/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

app.get('/books', listBooksView);
app.use('/api/books', bookRoutes);

app.use('/api/authors', authorRoutes);

app.use(globalErrorHandler);

export default app;