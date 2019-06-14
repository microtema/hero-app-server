import {BookService} from '../../../src/book';
import {Book} from '../../../src/book/Book';
import BookBuilder from '../book/BookBuilder';
import sut from './../../../src/book/Book.resolver';

describe('Book.resolver', () => {

    const bookService = {
        createBook: jest.fn((it) => it) as any,
        deleteBook: jest.fn((it) => it) as any,
        getBook: jest.fn((it) => it) as any,
        getBooks: jest.fn((it) => it) as any,
        updateBook: jest.fn((it) => it) as any,
    } as BookService;

    const builder = new BookBuilder();

    const context = {bookService};

    let book: Book;

    beforeEach(() => book = builder.min());

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('resolvers.Query.book', () => {

        const actual = sut.Query.book(null, book, context);

        expect(actual).toBeDefined();

        expect(bookService.getBook).toBeCalledWith(book.id);
    });

    it('resolvers.Query.books', () => {

        const actual = sut.Query.books(null, book, context);

        expect(actual).toBeDefined();

        expect(bookService.getBooks).toBeCalledWith(book);
    });

    it('resolvers.Mutation.createBook', () => {

        const actual = sut.Mutation.createBook(null, book, context);

        expect(actual).toBeDefined();

        expect(bookService.createBook).toBeCalledWith(book);
    });

    it('resolvers.Mutation.updateBook', () => {

        const actual = sut.Mutation.updateBook(null, book, context);

        expect(actual).toBeDefined();

        expect(bookService.updateBook).toBeCalledWith(book);
    });

    it('resolvers.Mutation.deleteBook', () => {

        const actual = sut.Mutation.deleteBook(null, book, context);

        expect(actual).toBeDefined();

        expect(bookService.deleteBook).toBeCalledWith(book.id);
    });

});
