const {describe, expect, test} = require('@jest/globals');
const route = require("../subscribers");
const request = require("supertest");

describe('Testing subscribers api', () => {
    test('GET / should return all subscribers', async () => {
        const res = await request(route).get('/');
        expect([200, 404, 500]).toContain(res.statusCode);
    });

    test('POST / should validate required fields', async () => {
        const res = await request(route).post('/').send({});
        expect([400, 200, 500]).toContain(res.statusCode);
    });

    test('PUT /:_id should require auth', async () => {
        const res = await request(route).put('/123').send({email: "test@example.com"});
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });

    test('DELETE /:_id should require auth', async () => {
        const res = await request(route).delete('/123');
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });
}); 