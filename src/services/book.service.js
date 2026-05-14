import BookRepository from '../repositories/book.repo.js';
import { BookResponseDTO } from '../dtos/book.dto.js'; 

class BookService {
    static async getAll() {
        const booksFromDB = await BookRepository.findAll();
        return booksFromDB.map(book => new BookResponseDTO(book));
    }

    static async getById(id) {
        const bookFromDB = await BookRepository.findById(id);
        if (!bookFromDB) {
            const error = new Error('LIVRO NAO ENCONTRADO');
            error.statusCode = 404; 
            throw error;
        }
        const bookDTO = new BookResponseDTO(bookFromDB);
        return bookDTO;
    }

    static async create(bookData) {
        const newBook = await BookRepository.create(bookData);
        const bookDTO = new BookResponseDTO(newBook);
        return bookDTO;
    }

    static async update(id, bookData) {
        const updatedBook = await BookRepository.update(id, bookData);
        if (!updatedBook) {
            const error = new Error('LIVRO NAO ENCONTRADO');
            error.statusCode = 404;
            throw error;
        }
        const bookDTO = new BookResponseDTO(updatedBook);
        return bookDTO;
    }

    static async delete(id) {
        const deletedBook = await BookRepository.delete(id);
        if (!deletedBook) {
            const error = new Error('LIVRO NAO ENCONTRADO');
            error.statusCode = 404;
            throw error;
        }
        return deletedBook;
    }
}
export default BookService;