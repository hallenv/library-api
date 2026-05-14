import db from '../data/db.js';

class BookRepository {
    /**
    * @returns {array} // array de tds os livros
    */
    static async findAll() {
        await db.read(); 
        return db.data.books;
    }

    /**
    * @param {string} bookId - 
    * @returns {object | undefined} // undefined caso nao encontre
    */
    static async findById(id) {
        await db.read(); 
        return db.data.books.find(p => p.id === id);
    }

    /**
    * @param {object} bookData  // dados do livro a criar
    * @returns {object} // livro ja criado
    */
    static async create(bookData) {
        await db.read();
        const newBook = {
            id: db.data.books.length > 0 ? Math.max(...db.data.books.map(p => p.id)) + 1 : 1,
            ...bookData
        };
        db.data.books.push(newBook);
        await db.write();
        return newBook;
    }

    // atualizar livro
    static async update(id, bookData) {
        await db.read();
        const bookIndex = db.data.books.findIndex(p => p.id === id);
        if (bookIndex === -1) {
            return undefined;
        }
        const updatedBook = {
            ...db.data.books[bookIndex],
            ...bookData,
            id
        };
        db.data.books[bookIndex] = updatedBook;
        await db.write();
        return updatedBook;
    }

    // deletar livro 
    static async delete(id) {
        await db.read();
        const bookIndex = db.data.books.findIndex(p => p.id === id);
        if (bookIndex === -1) {
            return undefined;
        }
        const [deletedBook] = db.data.books.splice(bookIndex, 1);
        await db.write();
        return deletedBook;
    }
}
export default BookRepository;