import AuthorRepository from '../repositories/author.repo.js';
import { AuthorResponseDTO } from '../dtos/author.dto.js'; 

class AuthorService {
    static async getAll() {
        const authorsFromDB = await AuthorRepository.findAll();
        return authorsFromDB.map(author => new AuthorResponseDTO(author));
    }

    static async getById(id) {
        const authorFromDB = await AuthorRepository.findById(id);
        if (!authorFromDB) {
            const error = new Error('AUTOR NAO ENCONTRADO');
            error.statusCode = 404; 
            throw error;
        }
        const authorDTO = new AuthorResponseDTO(authorFromDB);
        return authorDTO;
    }

    static async create(authorData) {
        const newAuthor = await AuthorRepository.create(authorData);
        const authorDTO = new AuthorResponseDTO(newAuthor);
        return authorDTO;
    }

    static async update(id, authorData) {
        const updatedAuthor = await AuthorRepository.update(id, authorData);
        if (!updatedAuthor) {
            const error = new Error('AUTOR NAO ENCONTRADO');
            error.statusCode = 404;
            throw error;
        }
        const authorDTO = new AuthorResponseDTO(updatedAuthor);
        return authorDTO;
    }

    static async delete(id) {
        const deletedAuthor = await AuthorRepository.delete(id);
        if (!deletedAuthor) {
            const error = new Error('AUTOR NAO ENCONTRADO');
            error.statusCode = 404;
            throw error;
        }
        return deletedAuthor;
    }
}
export default AuthorService;