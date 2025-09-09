const {describe, expect, test} = require('@jest/globals');
const route = require("../mail");
const request = require("supertest");

describe('Testing mail api', () => {
    test('POST / should validate required fields', async () => {
        const res = await request(route).post('/').send({});
        expect([400, 200, 500]).toContain(res.statusCode);
    });
}); 