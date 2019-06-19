import {default as sut} from '../../../src/repository/schemas';

describe('Schemas', () => {

    it('Should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('Should match', () => {
        expect(sut).toMatchSnapshot();
    });
});
