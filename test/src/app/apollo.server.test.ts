import {AddressService} from '../../../src/address';
import ApolloServer from '../../../src/app/apollo.server';
import AppProperties from '../../../src/app/App.properties';
import AuthorService from '../../../src/author/Author.service';
import BookService from '../../../src/book/Book.service';

describe('Test apollo server', () => {

    const authorService = {} as AuthorService;
    const bookService = {} as BookService;
    const addressService = {} as AddressService;
    const appProperties = new AppProperties();

    const sut = new ApolloServer(authorService, bookService, addressService, appProperties);

    const context = sut.config.context({req: {}});

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('config.context should return req object', () => {

        const contextFn = sut.config.context as any;

        const actual = contextFn({foo: {}, req: {params: {foo: true}}});

        expect(actual.authorService).toBe(authorService);
        expect(actual.bookService).toBe(bookService);
        expect(actual.addressService).toBe(addressService);
    });
});
