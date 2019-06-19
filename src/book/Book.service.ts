import {Inject, Singleton} from 'typescript-ioc';
import {Book} from './Book';
import BookRepository from './Book.repository';

@Singleton
export default class BookService {

    constructor(@Inject private repository: BookRepository) {
    }

    public getBooks({title}: { title: string }) {

        return this.repository.findAll(title);
    }

    public getBook(id: number) {

        return this.repository.findByPk(id);
    }

    public createBook(book: Book) {

        return this.repository.save(book).then((it) => this.getBook(it.id));
    }

    /**
     * Note: Since the ...repository.update does not return nothing,
     *       we need to return the updated entity
     * @param book may not be null
     */
    public updateBook(book: Book) {

        return this.repository.update(book)
            .then((it) => this.getBook(book.id));
    }

    public deleteBook(id: number) {

        return this.repository.delete(id);
    }
}
