import db from '../data/db.js';

const authorsCollection = () => db.collection('authors');

class AuthorRepository {
    /**
    * @returns {array} // array de tds os autores
    */
    static async findAll() {
        return await authorsCollection().find().toArray();
    }

    /**
    * @param {string|number} id 
    * @returns {object | undefined} // undefined caso nao encontre
    */
    static async findById(id) {
        return await authorsCollection().findOne({ id });
    }

    /**
    * @param {object} authorData // dados do autor a criar
    * @returns {object} // autor criado
    */
    static async create(authorData) {
        const lastAuthor = await authorsCollection().find().sort({ id: -1 }).limit(1).next();
        const nextId = lastAuthor ? lastAuthor.id + 1 : 1;
        const newAuthor = {
            id: nextId,
            nome: authorData.nome
        };
        await authorsCollection().insertOne(newAuthor);
        return newAuthor;
    }

    // atualizar um autor 
    static async update(id, authorData) {
        const result = await authorsCollection().findOneAndUpdate(
            { id },
            { $set: authorData },
            { returnDocument: 'after' }
        );
        return result.value || undefined;
    }

    // deletar um autor
    static async delete(id) {
        const result = await authorsCollection().findOneAndDelete({ id });
        return result.value || undefined;
    }
}

export default AuthorRepository;