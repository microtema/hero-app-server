import {BookService} from '../../../src/book';
import {default as authorRepository} from '../repository/MockCrudRepository';
import BookBuilder from './BookBuilder';

describe('Test AuthorService', () => {

    const sut = new BookService(authorRepository);
    const builder = new BookBuilder();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('getBooks filter by title', () => {

        // given
        const {title} = builder.min();

        // when
        const promise = sut.getBooks({title});

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.findAll).toBeCalledWith(title);
    });

    it('getBook by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.getBook(id);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.findByPk).toBeCalledWith(id);
    });

    it('deleteBook by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.deleteBook(id);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.delete).toBeCalledWith(id);
    });

    it('createBook', () => {

        // given
        const book = builder.min();

        // when
        const promise = sut.createBook(book);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.save).toBeCalledWith(book);
    });

    it('updateBook', () => {

        // given
        const book = builder.min();

        // when
        const promise = sut.updateBook(book);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.update).toBeCalledWith(book);
    });
});
