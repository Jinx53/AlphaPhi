const express = require('express');
const request = require('supertest');
const router = require('../users');

jest.mock('../../models/User');
jest.mock('../../middleware/auth/jwt', () => jest.fn((req, res, next) => next()));
jest.mock('../../middleware/mailer', () => ({ cpanelMailer: jest.fn(() => Promise.resolve({ response: '250 OK' })) }));

const User = require('../../models/User');
const { cpanelMailer } = require('../../middleware/mailer');

// Helper to create app with router
function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/', router);
  return app;
}

describe('users API', () => {
  let app;
  beforeEach(() => {
    app = createApp();
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      User.find.mockReturnValue({ select: () => ({ sort: () => Promise.resolve([{ _id: '1', fname: 'A', lname: 'B', email: 'a@b.com' }]) }) });
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /', () => {
    it('should validate required fields', async () => {
      const res = await request(app).post('/').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should validate password match', async () => {
      const res = await request(app).post('/').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'x', password2: 'y' });
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if user exists', async () => {
      User.findOne.mockResolvedValue({});
      const res = await request(app).post('/').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'x', password2: 'x' });
      expect(res.statusCode).toBe(400);
    });
    it('should create user if valid', async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({ _id: '1', fname: 'A', lname: 'B', email: 'a@b.com' });
      const res = await request(app).post('/').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe('a@b.com');
    });
  });

  describe('POST /signup', () => {
    it('should validate required fields', async () => {
      const res = await request(app).post('/signup').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should validate password pattern', async () => {
      const res = await request(app).post('/signup').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'short', password2: 'short' });
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if user exists', async () => {
      User.findOne.mockResolvedValue({});
      const res = await request(app).post('/signup').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(400);
    });
    it('should create user and return token if valid', async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({ _id: '1', fname: 'A', lname: 'B', email: 'a@b.com' });
      const res = await request(app).post('/signup').send({ fname: 'A', lname: 'B', email: 'a@b.com', password: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe('a@b.com');
      expect(res.body.token).toBeDefined();
    });
  });

  describe('GET /:userId', () => {
    it('should return user if found', async () => {
      User.findById.mockResolvedValue({ _id: '1', fname: 'A', lname: 'B', email: 'a@b.com' });
      const res = await request(app).get('/123');
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe('a@b.com');
    });
    it('should handle error', async () => {
      User.findById.mockRejectedValue(new Error('fail'));
      const res = await request(app).get('/123');
      expect(res.statusCode).toBe(200); // returns {message: err}
      expect(res.body.message).toBeDefined();
    });
  });

  describe('DELETE /:userId', () => {
    it('should delete user', async () => {
      User.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const res = await request(app).delete('/123');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    it('should handle error', async () => {
      User.deleteOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).delete('/123');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PATCH /:userId', () => {
    it('should update user', async () => {
      User.updateOne.mockResolvedValue({ modifiedCount: 1 });
      const res = await request(app).patch('/123').send({ email: 'new@b.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    it('should handle error', async () => {
      User.updateOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).patch('/123').send({ email: 'new@b.com' });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('PUT /:userId', () => {
    it('should require email', async () => {
      const res = await request(app).put('/123').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if user with email exists', async () => {
      User.findOne.mockResolvedValue({});
      const res = await request(app).put('/123').send({ email: 'a@b.com' });
      expect(res.statusCode).toBe(400);
    });
    it('should update user if valid', async () => {
      User.findOne.mockResolvedValue(null);
      User.updateOne.mockResolvedValue({ modifiedCount: 1 });
      const res = await request(app).put('/123').send({ email: 'new@b.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    it('should handle error', async () => {
      User.findOne.mockResolvedValue(null);
      User.updateOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).put('/123').send({ email: 'new@b.com' });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('POST /passwordchange', () => {
    it('should require all fields', async () => {
      const res = await request(app).post('/passwordchange').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should require newpassword match', async () => {
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'Xy!12345', newpassword: 'Xy!12345', password2: 'nope' });
      expect(res.statusCode).toBe(400);
    });
    it('should require newpassword != currentpassword', async () => {
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'Xy!12345', newpassword: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(400);
    });
    it('should require password pattern', async () => {
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'old', newpassword: 'short', password2: 'short' });
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'old', newpassword: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if password incorrect', async () => {
      User.findOne.mockResolvedValue({ password: 'hashed' });
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'old', newpassword: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(400);
      bcrypt.compare.mockRestore();
    });
    it('should change password if valid', async () => {
      User.findOne.mockResolvedValue({ password: 'hashed' });
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhash');
      User.updateOne.mockResolvedValue({ modifiedCount: 1 });
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'old', newpassword: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      bcrypt.compare.mockRestore();
      bcrypt.genSalt.mockRestore();
      bcrypt.hash.mockRestore();
    });
    it('should handle error', async () => {
      User.findOne.mockResolvedValue({ password: 'hashed' });
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhash');
      User.updateOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).post('/passwordchange').send({ email: 'a@b.com', currentpassword: 'old', newpassword: 'Xy!12345', password2: 'Xy!12345' });
      expect(res.statusCode).toBe(404);
      bcrypt.compare.mockRestore();
      bcrypt.genSalt.mockRestore();
      bcrypt.hash.mockRestore();
    });
  });

  describe('POST /resetpassword', () => {
    it('should require _id', async () => {
      const res = await request(app).post('/resetpassword').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);
      const res = await request(app).post('/resetpassword').send({ _id: '1' });
      expect(res.statusCode).toBe(400);
    });
    it('should reset password and send mail if valid', async () => {
      User.findOne.mockResolvedValue({ _id: '1', email: 'a@b.com', fname: 'A', lname: 'B' });
      User.updateOne.mockResolvedValue({ modifiedCount: 1 });
      const res = await request(app).post('/resetpassword').send({ _id: '1' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(cpanelMailer).toHaveBeenCalled();
    });
    it('should handle error', async () => {
      User.findOne.mockResolvedValue({ _id: '1', email: 'a@b.com', fname: 'A', lname: 'B' });
      User.updateOne.mockRejectedValue(new Error('fail'));
      const res = await request(app).post('/resetpassword').send({ _id: '1' });
      expect(res.statusCode).toBe(404);
    });
  });
}); 