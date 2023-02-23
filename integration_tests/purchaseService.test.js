import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import User from '../src/models/userModel';
import Purchase from '../src/models/purchaseModel';
import {
  mockPurchase,
  mockSimpleUser
} from './purchaseServiceData';
import config from '../src/__mocks__/config';

jest.mock('../src/config');

jest.mock = {
  model: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
};

describe('API TESTS - Get Purchases Service - /api/purchases/userId', () => {
  test('Find purchases by userId', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    Purchase.find  = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockReturnValue({ mockPurchase })}));
    await request(app)
      .get(`/api/purchases/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ purchases: {mockPurchase}});
      });
  });

});