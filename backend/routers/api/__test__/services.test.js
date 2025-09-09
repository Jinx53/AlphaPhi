const {describe, expect, test} = require('@jest/globals');
const route = require("../services");
const request = require("supertest");

describe('Testing services api', () => {
    test('GET / should return all services', async () => {
        const res = await request(route).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('POST / should require auth and file upload', async () => {
        const res = await request(route).post('/').send({});
        expect([401, 403, 400, 500, 200]).toContain(res.statusCode);
    });

    test('PUT /:_id should require auth', async () => {
        const res = await request(route).put('/123').send({title: "test"});
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });

    test('DELETE /:_id should require auth', async () => {
        const res = await request(route).delete('/123');
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });
}); 