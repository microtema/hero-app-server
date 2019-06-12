import {AuthorService} from '../../../src/author';
import {BookService} from '../../../src/book';

describe('Test AuthorService', () => {

    const authorService = {
        getAuthors: jest.fn((size: number) => [{
            books: [{
                id: '1000',
                title: 'AWS',
            }],
        }]) as any,
    } as AuthorService;

    const sut = new BookService(authorService);

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('getBook by id should match', () => {

        expect(sut.getBook('1000')).toMatchSnapshot();

        expect(authorService.getAuthors).toBeCalledWith({name: ''});
    });

    it('getBook by id should not match', () => {

        expect(sut.getBook('0000')).toMatchSnapshot();
    });

    it('getBooks by title should match', () => {

        expect(sut.getBooks({title: 'AWS'})).toMatchSnapshot();

        expect(authorService.getAuthors).toBeCalledWith({name: ''});
    });

    it('getBooks by title should  not match', () => {

        expect(sut.getBooks({title: '0000'})).toMatchSnapshot();
    });
});
