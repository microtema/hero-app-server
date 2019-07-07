import request from 'supertest';
import ApolloServer from '../../../src/app/apollo.server';
import App from '../../../src/app/app';
import AppProperties from '../../../src/app/App.properties';
import {AuthService} from '../../../src/auth';

describe('Test the root path', () => {

    let sut: any;
    const apolloServer = {applyMiddleware: jest.fn(() => Promise.resolve({})) as any} as ApolloServer;
    const appProperties = new AppProperties();

    it('It should deny response', async () => {

        AuthService.prototype.verify = () => new Promise((resolve, reject) => reject({}));

        const authService = new AuthService();

        sut = new App(authService, apolloServer, appProperties);

        const response = await request(sut.server).get('/').set('authorization', 'Bearer adsf');

        expect(response.statusCode).toBe(401);
        expect(response.text).toBe('Invalid authorization header!');
    });

    it('It should pass response', async () => {

        AuthService.prototype.authenticateRequest = (req, resp, next) => next();

        const authService = new AuthService();

        sut = new App(authService, apolloServer, appProperties);

        const response = await request(sut.server).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Graphql API Gateway');
    });
});
