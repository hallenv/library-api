import db from '../data/db.js';

const booksCollection = () => db.collection('books');

class BookRepository {
    /**
    * @returns {array} // array de tds os livros
    */
    static async findAll(filter = {}) {
        const db = await connectToDatabase();
        return await db.collection('books').find(filter).toArray();
    }

    /**
    * @param {string|number} id 
    * @returns {object | undefined} // undefined caso nao encontre
    */
    static async findById(id) {
        return await booksCollection().findOne({ id });
    }

    /**
    * @param {object} bookData  // dados do livro a criar
    * @returns {object} // livro ja criado
    */
    static async create(bookData) {
        const lastBook = await booksCollection().find().sort({ id: -1 }).limit(1).next();
        const nextId = lastBook ? lastBook.id + 1 : 1;
        const newBook = {
            id: nextId,
            ...bookData
        };
        await booksCollection().insertOne(newBook);
        return newBook;
    }

    // atualizar livro
    static async update(id, bookData) {
        const result = await booksCollection().findOneAndUpdate(
            { id },
            { $set: bookData },
            { returnDocument: 'after' }
        );
        return result.value || undefined;
    }

    // deletar livro 
    static async delete(id) {
        const result = await booksCollection().findOneAndDelete({ id });
        return result.value || undefined;
    }
}
export default BookRepository;