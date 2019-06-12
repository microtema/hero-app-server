import {AuthorBuilder, AuthorService} from '../../../src/author';

describe('Test AuthorService', () => {

    const authorBuilder = {
        list: jest.fn((size: number) => [{id: '1000', name: 'foo'}]) as any,
        min: jest.fn(() => ({
            id: '123456',
        })) as any,
    } as AuthorBuilder;

    const sut = new AuthorService(authorBuilder);

    it('It should be defined', () => {

        expect(sut).toBeDefined();

        expect(authorBuilder.list).toBeCalledWith(10);
    });

    it('getAuthors by name should match', () => {

        expect(sut.getAuthors({name: 'foo'})).toMatchSnapshot();
    });

    it('getAuthors by name should not match', () => {

        expect(sut.getAuthors({name: 'bar'})).toMatchSnapshot();
    });

    it('getAuthor by id should match', () => {

        expect(sut.getAuthor('1000')).toMatchSnapshot();
    });

    it('getAuthor by id should  not match', () => {

        expect(sut.getAuthor('0000')).toMatchSnapshot();
    });

    it('deleteAuthor by id should return false', () => {

        expect(sut.deleteAuthor('0000')).toEqual(false);
    });

    it('deleteAuthor by id should return false', () => {

        expect(sut.deleteAuthor('1000')).toEqual(true);
    });

    it('createAuthor should return saved author with id', () => {

        const authorsSize = sut.getAuthors({name: ''}).length;

        const author = sut.createAuthor({name: 'foo'});

        expect(author).toBeDefined();
        expect(author.id).toEqual('123456');
        expect(author.name).toEqual('foo');
        expect(author.books).toEqual([]);

        expect(sut.getAuthor('123456')).toBe(author);
        expect(sut.getAuthors({name: ''}).length).toBe(authorsSize + 1);
    });
});
