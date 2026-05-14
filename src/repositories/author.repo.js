import db from '../data/db.js';

class AuthorRepository {
    /**
    * @returns {array} // array de tds os autores
    */
    static async findAll() {
        await db.read(); 
        return db.data.authors;
    }

    /**
    * @param {string} id 
    * @returns {object | undefined} // undefined caso nao encontre
    */
    static async findById(id) {
        await db.read(); 
        return db.data.authors.find(p => p.id === id);
    }

    /**
    * @param {object} authorData // dados do autor a criar
    * @returns {object} // autor criado
    */
    static async create(authorData) {
        await db.read();
        const newAuthor = {
            id: db.data.authors.length > 0 ? Math.max(...db.data.authors.map(p => p.id)) + 1 : 1,
            nome: authorData.nome
        };
        db.data.authors.push(newAuthor);
        await db.write();
        return newAuthor;
    }

    // atualizar um autor 
    static async update(id, authorData) {
        await db.read();
        const authorIndex = db.data.authors.findIndex(p => p.id === id);
        if (authorIndex === -1) { 
            return undefined;
        }
        const updatedAuthor = {
            ...db.data.authors[authorIndex],
            ...authorData,
            id
        };
        db.data.authors[authorIndex] = updatedAuthor;
        await db.write();
        return updatedAuthor;
    }

    // deletar um autor
    static async delete(id) {
        await db.read();
        const authorIndex = db.data.authors.findIndex(p => p.id === id);
        if (authorIndex === -1) {
            return undefined;
        }
        const [deletedAuthor] = db.data.authors.splice(authorIndex, 1);
        await db.write();
        return deletedAuthor;
    }
}

export default AuthorRepository;