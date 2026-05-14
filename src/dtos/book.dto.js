export class BookResponseDTO {
    constructor(book) {
        this.id = book.id;
        this.titulo = book.titulo;
        this.ano = book.ano;
        this.genero = book.genero;
        this.writerId = book.writerId;
    }
}