const express = require('express');
const request = require('supertest');
const router = require('../aboutus');

jest.mock('../../models/AboutUs');
jest.mock('../../middleware/auth/jwt', () => jest.fn((req, res, next) => next()));
const AboutUs = require('../../models/AboutUs');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/', router);
  return app;
}

describe('aboutus API', () => {
  let app;
  beforeEach(() => {
    app = createApp();
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return aboutus array', async () => {
      const aboutus = [{ title: 'the title', body: 'the body', created_at: new Date(), updated_at: new Date() }];
      AboutUs.find.mockReturnValue({ sort: () => Promise.resolve(aboutus) });
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].title).toBe('the title');
    });
    it('should handle error', async () => {
      AboutUs.find.mockReturnValue({ sort: () => Promise.reject(new Error('fail')) });
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200); // returns {message: err}
      expect(res.body.message).toBeDefined();
    });
  });

  describe('POST /', () => {
    it('should require at least one field', async () => {
      const res = await request(app).post('/').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should create aboutus if valid', async () => {
      AboutUs.prototype.save = jest.fn().mockResolvedValue({ _id: '1', title: 't', body: 'b' });
      const res = await request(app).post('/').send({ title: 't', body: 'b' });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('t');
    });
    it('should handle error', async () => {
      AboutUs.prototype.save = jest.fn().mockRejectedValue(new Error('fail'));
      const res = await request(app).post('/').send({ title: 't', body: 'b' });
      expect(res.statusCode).toBe(200); // returns {message: err}
      expect(res.body.message).toBeDefined();
    });
  });

  describe('PUT /:_id', () => {
    it('should update aboutus', async () => {
      AboutUs.replaceOne.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
      const res = await request(app).put('/1').send({ title: 'new', body: 'b' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    it('should handle error', async () => {
      AboutUs.replaceOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).put('/1').send({ title: 'new', body: 'b' });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('DELETE /:_id', () => {
    it('should delete aboutus', async () => {
      AboutUs.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const res = await request(app).delete('/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    it('should handle error', async () => {
      AboutUs.deleteOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).delete('/1');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
