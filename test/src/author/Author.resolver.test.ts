import {AuthorService} from '../../../src/author';
import {Author} from '../../../src/author/Author';
import BookBuilder from '../book/BookBuilder';
import sut from './../../../src/author/Author.resolver';
import AuthorBuilder from './AuthorBuilder';

describe('Author.resolver', () => {

    const authorService = {
        createAuthor: jest.fn((it) => it) as any,
        deleteAuthor: jest.fn((it) => it) as any,
        getAuthor: jest.fn((it) => it) as any,
        getAuthors: jest.fn((it) => it) as any,
        updateAuthor: jest.fn((it) => it) as any,
    } as AuthorService;

    const builder = new AuthorBuilder(new BookBuilder());

    const context = {authorService};

    let author: Author;

    beforeEach(() => author = builder.min());

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('resolvers.Query.author', () => {

        const actual = sut.Query.author(null, author, context);

        expect(actual).toBeDefined();

        expect(authorService.getAuthor).toBeCalledWith(author.id);
    });

    it('resolvers.Query.authors', () => {

        const actual = sut.Query.authors(null, author, context);

        expect(actual).toBeDefined();

        expect(authorService.getAuthors).toBeCalledWith(author);
    });

    it('resolvers.Mutation.createAuthor', () => {

        const actual = sut.Mutation.createAuthor(null, author, context);

        expect(actual).toBeDefined();

        expect(authorService.createAuthor).toBeCalledWith(author);
    });

    it('resolvers.Mutation.updateAuthor', () => {

        const actual = sut.Mutation.updateAuthor(null, author, context);

        expect(actual).toBeDefined();

        expect(authorService.updateAuthor).toBeCalledWith(author);
    });

    it('resolvers.Mutation.deleteAuthor', () => {

        const actual = sut.Mutation.deleteAuthor(null, author, context);

        expect(actual).toBeDefined();

        expect(authorService.deleteAuthor).toBeCalledWith(author.id);
    });

});
