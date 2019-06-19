import {default as sut} from '../../../src/repository/resolvers';

describe('Resolvers', () => {

    it('Should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('Should match', () => {
        expect(sut).toMatchSnapshot();
    });
});
