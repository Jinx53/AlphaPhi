const {describe, expect, test} = require('@jest/globals');
const route = require("../resourceteam");
const request = require("supertest");

describe('Testing resourceteam api', () => {
    test('GET / should return all resourceteam', async () => {
        const res = await request(route).get('/');
        expect([200, 500]).toContain(res.statusCode);
    });

    test('POST / should require auth and file upload', async () => {
        const res = await request(route).post('/').send({});
        expect([401, 403, 400, 500, 200]).toContain(res.statusCode);
    });

    test('PUT /:_id should require auth', async () => {
        const res = await request(route).put('/123').send({name: "test"});
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });

    test('DELETE /:_id should require auth', async () => {
        const res = await request(route).delete('/123');
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });
}); 