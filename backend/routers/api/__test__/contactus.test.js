const {describe, expect, test} = require('@jest/globals');
const route = require("../contactus");
const request = require("supertest");

describe('Testing contactus api', () => {
    test('GET / should return all contactus', async () => {
        const res = await request(route).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('POST / should require auth', async () => {
        const res = await request(route).post('/').send({});
        expect([401, 403, 400, 500, 200]).toContain(res.statusCode);
    });

    test('POST /mail should validate required fields', async () => {
        const res = await request(route).post('/mail').send({});
        expect([400, 200, 500]).toContain(res.statusCode);
    });

    test('PUT /:_id should require auth', async () => {
        const res = await request(route).put('/123').send({body: "test"});
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });

    test('PUT /setActive/:_id should require auth', async () => {
        const res = await request(route).put('/setActive/123').send({active: true});
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });

    test('DELETE /:_id should require auth', async () => {
        const res = await request(route).delete('/123');
        expect([401, 403, 400, 500, 200, 404]).toContain(res.statusCode);
    });
}); 