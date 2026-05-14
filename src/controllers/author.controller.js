import AuthorService from '../services/author.service.js';

export const listAuthors = async (req, res, next) => {
    try {
        const authors = await AuthorService.getAll();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};

export const findAuthorByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await AuthorService.getById(Number(id));
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

export const newAuthor = async (req, res, next) => {
    try {
        const { nome } = req.body;
        const authorData = { nome };
        const author = await AuthorService.create(authorData);
        res.status(201).json(author);
    } catch (error) {
        next(error);
    }
};

export const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const authorData = {
            ...(nome !== undefined && { nome })
        };
        const author = await AuthorService.update(Number(id), authorData);
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

export const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        await AuthorService.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
