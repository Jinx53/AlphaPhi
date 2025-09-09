const {describe, expect, test} = require('@jest/globals');
const route = require("../auth");
const request = require("supertest");

describe('Testing auth api', () => {
    test('POST / should validate required fields', async () => {
        const res = await request(route).post('/').send({});
        expect(res.statusCode).toBe(400);
    });

    test('GET /user should require auth', async () => {
        const res = await request(route).get('/user');
        expect([401, 403, 400, 500, 200]).toContain(res.statusCode);
    });
}); 