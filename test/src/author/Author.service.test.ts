import {AuthorService} from '../../../src/author';
import BookBuilder from '../book/Book.builder';
import {default as authorRepository} from '../repository/MockCrudRepository';
import AuthorBuilder from './Author.builder';

describe('Test AuthorService', () => {

    const sut = new AuthorService(authorRepository);
    const builder = new AuthorBuilder(new BookBuilder());

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('getAuthors filter by name', () => {

        // given
        const author = builder.min();

        // when
        const promise = sut.getAuthors(author);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.findAll).toBeCalledWith(author.name);
    });

    it('getAuthor by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.getAuthor(id);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.findByPk).toBeCalledWith(id);
    });

    it('deleteAuthor by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.deleteAuthor(id);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.delete).toBeCalledWith(id);
    });

    it('createAuthor', () => {

        // given
        const author = builder.min();

        // when
        const promise = sut.createAuthor(author);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.save).toBeCalledWith(author);
    });

    it('updateAuthor', () => {

        // given
        const author = builder.min();

        // when
        const promise = sut.updateAuthor(author);

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.update).toBeCalledWith(author);
    });
});
