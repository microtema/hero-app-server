import BookBuilder from '../book/Book.builder';
import AuthorBuilder from './Author.builder';

describe('Test AuthorBuilder', () => {

    const bookBuilder = {list: jest.fn((size: number) => [{title: 'foo'}]) as any} as BookBuilder;

    const sut = new AuthorBuilder(bookBuilder);

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('It should create min', () => {

        const actual = sut.min();

        expect(actual.id).toBeDefined();
        expect(actual.name).toBeDefined();
        expect(actual.books.length).toEqual(1);
        expect(actual.books[0].author).toBe(actual);

        expect(bookBuilder.list).toBeCalledWith(3);
    });
});
