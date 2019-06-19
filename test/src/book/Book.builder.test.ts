import BookBuilder from './Book.builder';

describe('Test BookBuilder', () => {

    const sut = new BookBuilder();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('It should create min', () => {

        const actual = sut.min();

        expect(actual.id).toBeDefined();
        expect(actual.title).toBeDefined();
        expect(actual.author).not.toBeDefined();
    });
});
