import {AuthorBuilder, AuthorService} from '../../../src/author';

describe('Test AuthorService', () => {

    const authorBuilder = {list: jest.fn((size: number) => [{id: '1000', name: 'foo'}]) as any} as AuthorBuilder;

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
});
