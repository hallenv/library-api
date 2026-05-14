import BookService from '../services/book.service.js';

export const listBooksView = async (req, res, next) => {
    try {
        const books = await BookService.getAll();
        res.status(200).render('books/index', { books });
    } catch (error) {
        next(error);
    }
};

export const listBooks = async (req, res, next) => {
    try {
        const books = await BookService.getAll();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

export const findBookByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await BookService.getById(Number(id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

export const newBook = async (req, res, next) => {
    try {
        const { titulo, ano, genero, writerId } = req.body;
        const bookData = {
            titulo,
            ano,
            genero,
            writerId
        };
        const book = await BookService.create(bookData);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, ano, genero, writerId } = req.body;
        const bookData = {
            ...(titulo !== undefined && { titulo }),
            ...(ano !== undefined && { ano }),
            ...(genero !== undefined && { genero }),
            ...(writerId !== undefined && { writerId })
        };
        const book = await BookService.update(Number(id), bookData);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        await BookService.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
