import request from 'supertest';
import {default as sut} from '../../../src/app/app';

describe('Test the root path', () => {

    it('It should response the GET method', async () => {

        const response = await request(sut).get('/');

        expect(response.statusCode).toBe(200);
    });
});
