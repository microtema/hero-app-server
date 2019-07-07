import azureJwtVerify from 'azure-jwt-verify';
import {Request, Response} from 'express-serve-static-core';
import {AuthService} from '../../../src/auth';

describe('Auth Service', () => {

    const sut = new AuthService();

    const request = {headers: {authorization: 'authorization'}} as Request;
    const response = {
        send: jest.fn() as any,
        status: jest.fn() as any,
    } as Response;
    const next = jest.fn();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('isValidAuthorization on undefined', () => {

        const authorization = undefined;

        expect(sut.isValidAuthorization(authorization)).toEqual(false);
    });

    it('isValidAuthorization on empty', () => {

        const authorization = '';

        expect(sut.isValidAuthorization(authorization)).toEqual(false);
    });

    it('isValidAuthorization on empty', () => {

        const authorization = ' ';

        expect(sut.isValidAuthorization(authorization)).toEqual(false);
    });

    it('isValidAuthorization on invalid format', () => {

        const authorization = 'foo bar';

        expect(sut.isValidAuthorization(authorization)).toEqual(false);
    });

    it('isValidAuthorization on valid format', () => {

        const authorization = 'Bearer 89abddfb-2cff-4fda-83e6-13221f0c3d4f';

        expect(sut.isValidAuthorization(authorization)).toEqual(true);
    });

    it('authenticateRequest with invalid authorization', () => {

        request.headers.authorization = undefined;

        sut.authenticateRequest(request, response, next);

        expect(next).not.toBeCalledWith();

        expect(response.status).toBeCalledWith(401);
        expect(response.send).toBeCalledWith('Invalid authorization header!');
    });

    it('errorHandler', () => {

        // given
        const error = {message: 'Error'};

        // when
        sut.errorHandler(error, response);

        // then
        expect(response.status).toBeCalledWith(401);
        expect(response.send).toBeCalledWith('Invalid authorization token!');
    });

    it('azureJwtVerify', () => {

        // mock
        azureJwtVerify.verify = jest.fn();

        // given
        const token = '';

        // when
        sut.verify(token);

        // then
        expect(azureJwtVerify.verify).toBeCalledWith(token, {
            AUD: 'd39004ce-286d-4c84-8b37-145e237addaa',
            ISS: 'https://login.microsoftonline.de/41567caa-2f7d-4d52-8ed3-eb6b36fd70dd/v2.0',
            JWK_URI: 'https://login.microsoftonline.de/41567caa-2f7d-4d52-8ed3-eb6b36fd70dd/discovery/v2.0/keys',
        });
    });

    it('successHandler', () => {

        // given
        const jwt = JSON.stringify({
            message: {
                preferred_username: 'foo@bar.com',
            },
        });

        // when
        sut.successHandler(jwt, request, next);

        // then
        expect(next).toBeCalled();
        expect(request).toHaveProperty('user');
        expect((request as any).user).toEqual({username: 'foo'});
        expect(next).toBeCalled();
    });

    it('authenticateRequest with valid authorization', (done) => {

        // given
        const jwt = JSON.stringify({
            message: {
                preferred_username: 'foo@bar.com',
            },
        });

        // mock
        AuthService.prototype.successHandler = jest.fn();
        AuthService.prototype.verify = (token) => new Promise((resolve) => {

            resolve(jwt);

            done();

            expect(sut.successHandler).toBeCalledWith(jwt, request, next);
        });

        request.headers.authorization = 'Bearer 89abddfb-2cff-4fda-83e6-13221f0c3d4f';

        sut.authenticateRequest(request, response, next);
    });

    it('authenticateRequest with invalid authorization', (done) => {

        // given
        const error = {message: 'Error'};
        // mock
        AuthService.prototype.errorHandler = jest.fn();
        AuthService.prototype.verify = (token) => new Promise((resolve, reject) => {

            reject(error);

            done();

            expect(sut.errorHandler).toBeCalledWith(error, request);
        });

        request.headers.authorization = 'Bearer 89abddfb-2cff-4fda-83e6-13221f0c3d4f';

        sut.authenticateRequest(request, response, next);
    });
});
