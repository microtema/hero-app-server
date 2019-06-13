import {Inject, Singleton} from 'typescript-ioc';
import AuthorService from '../author/AuthorService';
import {Book} from './Book';

@Singleton
export default class BookService {

    constructor(@Inject private authorService: AuthorService) {
    }

    public getBook(id: string): Book {

        return this.getAllBooks().find((it) => it.id === id);
    }

    public getBooks({title}: { title: string }): Book[] {

        return this.getAllBooks().filter((it) => it.title.match(title));
    }

    private getAllBooks(): Book[] {

        return [];
    }
}
