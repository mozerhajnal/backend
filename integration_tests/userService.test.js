import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../src/models/userModel';
import app from '../src/app';
import {
  TEST_EXCEPTION,
  anyUserEmail,
  anyUserPassword,
  unregisteredUserEmail,
  registeredUserEmail,
  registeredUserPlainPwd,
  registeredUser,
  mockSimpleUser,
} from './userServiceData';
import config from '../src/__mocks__/config';
import {
  mockData,
  mockSavedUser,
  passwordLessEight,
} from '../src/utils/expressMocker';

jest.mock('../src/config');

describe('API TESTS - Login User Service - /api/login', () => {
  test('Login without email and password', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('All fields are required.');
        return done();
      });
  });

  test('Login without email', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email is required.');
        return done();
      });
  });

  test('Login without password', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: anyUserEmail,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Password is required.');
        return done();
      });
  });

  test('Login with unregistered email', (done) => {
    User.findOne = jest.fn().mockReturnValue(null);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: unregisteredUserEmail,
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email or password is incorrect.');
        return done();
      });
  });

  test('Login with wrong password', (done) => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email or password is incorrect.');
        return done();
      });
  });

  test('Login with registered email and correct password', (done) => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: registeredUserPlainPwd,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toEqual('ok');
        expect(res.body.token).toBeDefined();
        return done();
      });
  });

  test('Exception during login', (done) => {
    User.findOne = jest.fn().mockImplementation(() => {
      throw new Error(TEST_EXCEPTION);
    });

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: anyUserPassword,
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(TEST_EXCEPTION);
        return done();
      });
  });
});

describe('API TESTS - User Profile Service- /api/users', () => {
  test('Profile update without token', async () => {
    await request(app)
      .patch('/api/users')
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid token');
      });
  });

  test('Send an empty request with user token', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('A field is required.');
      });
  });

  test('Exception during find user', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });
    User.findOne = await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName' })
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('Error');
      });
  });

  test('Send a request with user token but with non-existent user id', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(null);
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName' })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('User not found');
      });
  });

  test('Email is already taken', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    User.findOne = jest.fn().mockReturnValue(mockSimpleUser);
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName', email: 'fake@fake.com' })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('Email is already taken.');
      });
  });

  test('Exception during check email', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    User.findOne = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName', email: 'fake@fake.com' })
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('Error');
      });
  });

  test('Exception during save', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    User.findOne = jest.fn().mockReturnValue(false);
    jest.spyOn(User.prototype, 'save').mockImplementation(() => {
      throw new Error('Error');
    });
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName' })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('Error');
      });
  });

  test('Update successful', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue({ ...mockSimpleUser });
    User.findOne = jest.fn().mockReturnValue(null);
    jest.spyOn(User.prototype, 'save').mockReturnValueOnce(mockSavedUser);
    jest.spyOn(jwt, 'sign').mockReturnValue(123456789);
    await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'dummyName' })
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(mockSavedUser._id);
        expect(res.body.email).toEqual(mockSavedUser.email);
        expect(res.body.name).toEqual(mockSavedUser.name);
        expect(res.body.token).toBeDefined();
        expect(res.body.token).toEqual(123456789);
      });
  });
});

describe('API TESTS - Register User- /api/register', () => {
  test('send an empty request', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          'Name, email and password are required.',
        );
        return done();
      });
  });

  test('send request with a name and email', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        email: mockData.email,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Password is required.');
        return done();
      });
  });

  test('send request with an email and password', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: mockData.email,
        password: mockData.password,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Name is required.');
        return done();
      });
  });

  test('send request with a name and password', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        password: mockData.password,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email is required.');
        return done();
      });
  });

  test('send a password under 8 character', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        email: mockData.email,
        password: passwordLessEight,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          'Password must be at least 8 characters.',
        );
        return done();
      });
  });

  test('send a with a good email, password and name', (done) => {
    User.findOne = jest.fn().mockReturnValue(null);
    jest.spyOn(bcrypt, 'hash').mockReturnValue(10);
    jest.spyOn(User.prototype, 'save').mockReturnValueOnce(mockSavedUser);
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        ...mockData,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toEqual(mockSavedUser._id);
        expect(res.body.email).toEqual(mockSavedUser.email);
        expect(res.body.isAdmin).toEqual(mockSavedUser.isAdmin);
        expect(res.body.isVerified).toEqual(mockSavedUser.isVerified);
        return done();
      });
  });
});
