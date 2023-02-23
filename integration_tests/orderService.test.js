import request from 'supertest';
import jwt from 'jsonwebtoken';
import User from '../src/models/userModel';
import Order from '../src/models/orderModel';
import Product from '../src/models/productModel';
import Purchase from '../src/models/purchaseModel';
import app from '../src/app';
import config from '../src/__mocks__/config';
import {
  invalidUserId,
  validUserId,
  mockProductData,
  mockSimpleUser,
  mockedOrderFindOrder,
  responseOrder,
  mockSavedOrder,
  mockedResObj,
  mockPurchase
} from './orderServiceData';

jest.mock('../src/config');

describe('API TESTS - Get User Orders Service - /api/orders', () => {
  test('User access - Get pending orders without token', async () => {
    await request(app)
      .get(`/api/orders/${invalidUserId}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Invalid token');
      });
  });

  test('User access - Get pending orders with token and invalid user ID', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    await request(app)
      .get(`/api/orders/${invalidUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Unauthorized access');
      });
  });

  test('User access - Get pending orders with token and non-existent user ID', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(null);
    await request(app)
      .get(`/api/orders/${validUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Unauthorized access');
      });
  });

  test('User access - Get pending orders with token and existent user ID', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    await request(app)
      .get(`/api/orders/${validUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Unauthorized access');
      });
  });

  test("User access - Get pending orders with token and the token's id", async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    Order.find = jest.fn().mockReturnValue([mockedOrderFindOrder]);
    await request(app)
      .get(`/api/orders/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ orders: [responseOrder] });
      });
  });

  test('User access - Exception during get pending orders', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    Order.find = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error');
    });
    await request(app)
      .get(`/api/orders/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(500)
      .then(res => {
        expect(res.body.message).toEqual('Error');
      });
  });

  test('User access - Exception during get find user', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error');
    });
    await request(app)
      .get(`/api/orders/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(500)
      .then(res => {
        expect(res.body.message).toEqual('Error');
      });
  });
});

describe('API TESTS - Admin Orders Service - /api/admin/orders', () => {
  test('Try to access without token', async () => {
    await request(app)
      .get(`/api/orders/${invalidUserId}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Invalid token');
      });
  });

  test('Try to access with user token', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    await request(app)
      .get(`/api/orders/${invalidUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Unauthorized access');
      });
  });
});

describe('API TESTS - Save User Orders Service - /api/orders', () => {
  test('Post pending orders with token', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    User.findById = jest.fn().mockReturnValue(mockSimpleUser);
    Product.findById = jest.fn().mockReturnValue([mockProductData]);
    jest.spyOn(Order.prototype, 'save').mockReturnValueOnce(mockSavedOrder);
    await request(app)
      .post(`/api/orders/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .send({
        ...mockSavedOrder,
      })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ orders: mockedResObj });
      });
  });
});

describe('API TESTS - Remove All User Orders Service - /api/orders', () => {
  test('Remove all pending orders with token', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    Order.deleteMany = jest.fn().mockReturnValue([mockSavedOrder]);
    await request(app)
      .delete('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ deleted: [mockSavedOrder] });
      });
  });
});

describe('API TESTS - Remove Item from Cart - /api/orders', () => {
  test('Remove item with token from cart', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    Order.findByIdAndRemove = jest.fn().mockReturnValue([mockSavedOrder]);
    await request(app)
      .delete(`/api/orders/${mockSavedOrder.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ orderItem: [mockSavedOrder] });
      });
  });
});

describe('API TESTS - Buy items from Cart - /api/orders', () => {
  test('Buy products with token from cart', async () => {
    const token = jwt.sign({ ...mockSimpleUser }, config.token_key);
    Order.find = jest.fn().mockReturnValue([mockSavedOrder]);
    Order.updateMany = jest.fn().mockReturnValue([mockSavedOrder]);
    Purchase.insertMany = jest.fn().mockReturnValueOnce(mockPurchase);
    await request(app)
      .patch(`/api/orders/${mockSimpleUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .send({
        totalPaid: mockSavedOrder.price,
      })
      .expect(200)
  });
});
