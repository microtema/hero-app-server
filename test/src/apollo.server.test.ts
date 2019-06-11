import {config, default as sut, resolvers, typeDefs} from '../../src/apollo.server';

describe('Test apollo server', () => {

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('config.context should return req object', () => {

        const context = config.context as any;

        const actual = context({foo: {}, req: {params: {foo: true}}});

        expect(actual).toMatchSnapshot();
    });

    it('resolvers.Query.hello should return string', () => {

        expect(resolvers.Query.hello()).toMatchSnapshot();
    });

    it('typeDefs', () => {

        expect(typeDefs).toMatchSnapshot();
    });
});
