import ApolloServer from '../../src/apollo.server';
import AuthorService from '../../src/author/AuthorService';
import BookService from '../../src/book/BookService';

describe('Test apollo server', () => {

    const authorService = {
        createAuthor: jest.fn() as any,
        deleteAuthor: jest.fn() as any,
        getAuthor: jest.fn((id) => ({id})) as any,
        getAuthors: jest.fn((name) => ({name})) as any,
        updateAuthor: jest.fn() as any,
    } as AuthorService;
    const bookService = {
        createBook: jest.fn((title) => ({title})) as any,
        deleteBook: jest.fn((title) => ({title})) as any,
        getBook: jest.fn((id) => ({id})) as any,
        getBooks: jest.fn((title) => ({title})) as any,
        updateBook: jest.fn((title) => ({title})) as any,
    } as BookService;

    const sut = new ApolloServer(authorService, bookService);

    const context = sut.config.context({req: {}});

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('config.context should return req object', () => {

        const contextFn = sut.config.context as any;

        const actual = contextFn({foo: {}, req: {params: {foo: true}}});

        expect(context).toMatchSnapshot();
    });

    it('resolvers.Query.author', () => {

        const actual = sut.resolvers.Query.author(null, {id: '1000'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.getAuthor).toBeCalledWith('1000');
    });

    it('resolvers.Query.authors', () => {

        const actual = sut.resolvers.Query.authors(null, {name: 'lorem'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.getAuthors).toBeCalledWith({name: 'lorem'});
    });

    it('resolvers.Query.book', () => {

        const actual = sut.resolvers.Query.book(null, {id: '2000'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.getBook).toBeCalledWith('2000');
    });

    it('resolvers.Query.books', () => {

        const actual = sut.resolvers.Query.books(null, {title: 'AWS'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.getBooks).toBeCalledWith({title: 'AWS'});
    });

    it('resolvers.Mutation.createAuthor', () => {

        const actual = sut.resolvers.Mutation.createAuthor(null, {name: 'Foo'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.createAuthor).toBeCalledWith({name: 'Foo'});
    });

    it('resolvers.Mutation.updateAuthor', () => {

        const actual = sut.resolvers.Mutation.updateAuthor(null, {id: '1000', name: 'Foo'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.updateAuthor).toBeCalledWith({id: '1000', name: 'Foo'});
    });

    it('resolvers.Mutation.deleteAuthor', () => {

        const actual = sut.resolvers.Mutation.deleteAuthor(null, {id: '123456'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(authorService.deleteAuthor).toBeCalledWith('123456');
    });

    it('resolvers.Mutation.createBook', () => {

        const actual = sut.resolvers.Mutation.createBook(null, {title: 'Foo', authorId: '1000'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.createBook).toBeCalledWith({title: 'Foo', authorId: '1000'});
    });

    it('resolvers.Mutation.updateBook', () => {

        const actual = sut.resolvers.Mutation.updateBook(null, {id: '1000', title: 'Foo'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.updateBook).toBeCalledWith({id: '1000', title: 'Foo'});
    });

    it('resolvers.Mutation.deleteBook', () => {

        const actual = sut.resolvers.Mutation.deleteBook(null, {id: '123456'}, context, null);

        expect(actual).toMatchSnapshot();

        expect(bookService.deleteBook).toBeCalledWith('123456');
    });

    it('typeDefs', () => {

        expect(sut.typeDefs).toMatchSnapshot();
    });
});
