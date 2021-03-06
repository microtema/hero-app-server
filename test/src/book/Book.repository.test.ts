import BookRepository from '../../../src/book/Book.repository';

describe('BookRepository API', () => {

    const sut = new BookRepository();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('findAll', async () => {

        const actual = await sut.findAll('');

        expect(actual).toBeDefined();
    });

    it('findByPk', async () => {

        const actual = await sut.findByPk(1);

        expect(actual).toBeDefined();
    });
});
