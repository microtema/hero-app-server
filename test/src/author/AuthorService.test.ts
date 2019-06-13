import {AuthorRepository, AuthorService} from '../../../src/author';
import {BookBuilder} from '../../../src/book';
import AuthorBuilder from './AuthorBuilder';

describe('Test AuthorService', () => {

    const authorRepository = {
        delete: jest.fn(() => Promise.resolve({})) as any,
        findAll: jest.fn(() => Promise.resolve({})) as any,
        findByPk: jest.fn(() => Promise.resolve({})) as any,
        save: jest.fn(() => Promise.resolve({})) as any,
        update: jest.fn(() => Promise.resolve({})) as any,
    } as AuthorRepository;

    const sut = new AuthorService(authorRepository);
    const builder = new AuthorBuilder(new BookBuilder());

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('getAuthors filter by name', () => {

        // given
        const {name} = builder.min();

        // when
        const promise = sut.getAuthors({name});

        // then
        expect(promise).toBeDefined();
        expect(authorRepository.findAll).toBeCalledWith(name);
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
