import ApolloServer from '../../../src/app/apollo.server';
import AuthorService from '../../../src/author/AuthorService';
import BookService from '../../../src/book/BookService';

describe('Test apollo server', () => {

    const authorService = {
    } as AuthorService;
    const bookService = {
    } as BookService;

    const sut = new ApolloServer(authorService, bookService);

    const context = sut.config.context({req: {}});

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('config.context should return req object', () => {

        const contextFn = sut.config.context as any;

        const actual = contextFn({foo: {}, req: {params: {foo: true}}});

        expect(actual.authorService).toBe(authorService);
        expect(actual.bookService).toBe(bookService);
    });
});
