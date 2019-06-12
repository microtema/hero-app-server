import ApolloServer from '../../src/apollo.server';
import AuthorService from '../../src/author/AuthorService';
import BookService from '../../src/book/BookService';

describe('Test apollo server', () => {

    const authorService = {
        getAuthor: jest.fn((id) => ({id})) as any,
        getAuthors: jest.fn((name) => ({name})) as any,
    } as AuthorService;
    const bookService = {
        getBook: jest.fn((id) => ({id})) as any,
        getBooks: jest.fn((title) => ({title})) as any,
    } as BookService;

    const sut = new ApolloServer(authorService, bookService);

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('config.context should return req object', () => {

        const context = sut.config.context as any;

        const actual = context({foo: {}, req: {params: {foo: true}}});

        expect(actual).toMatchSnapshot();
    });

    it('resolvers.Query.author', () => {

        const actual = sut.resolvers.Query.author(null, {id: '1000'}, {req: {}}, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.getAuthor).toBeCalledWith('1000');
    });

    it('resolvers.Query.authors', () => {

        const actual = sut.resolvers.Query.authors(null, {name: 'lorem'}, {req: {}}, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.getAuthors).toBeCalledWith({name: 'lorem'});
    });

    it('resolvers.Query.book', () => {

        const actual = sut.resolvers.Query.book(null, {id: '2000'}, {req: {}}, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.getBook).toBeCalledWith('2000');
    });

    it('resolvers.Query.books', () => {

        const actual = sut.resolvers.Query.books(null, {title: 'AWS'}, {req: {}}, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.getBooks).toBeCalledWith({title: 'AWS'});
    });

    it('typeDefs', () => {

        expect(sut.typeDefs).toMatchSnapshot();
    });
});
