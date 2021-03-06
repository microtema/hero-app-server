import {AddressRepository} from '../../../src/address';

describe('AuthorRepository API', () => {

    const sut = new AddressRepository();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('findAll', async () => {

        const actual = await sut.findAll('');

        expect(actual).toBeDefined();
    });

    it('findAll without filter', async () => {

        const actual = await sut.findAll();

        expect(actual).toBeDefined();
    });

    it('findByPk', async () => {

        const actual = await sut.findByPk(1);

        expect(actual).toBeDefined();
    });
});
