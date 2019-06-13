import AuthorRepository from '../../../src/author/AuthorRepository';

describe('AuthorRepository API', () => {

    const sut = new AuthorRepository();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('findAll', async () => {

        const actual = await sut.findAll('');

        // expect(actual).toEqual([]);
    });
});
