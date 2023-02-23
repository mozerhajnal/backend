import request from 'supertest';
import app from '../src/app';
import Product from '../src/models/productModel';
import {
  mockResponseData
} from './newsLetterServiceData';


describe('API TESTS - Get Product Service - /api/products', () => {
  test('Get all available products', async () => {
    Product.find = jest.fn().mockReturnValue([mockResponseData]);
    await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ products: [mockResponseData] });
      });
  });

  test('Exception during find', async () => {
    Product.find = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error');
    });
    await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect(500)
      .then(res => {
        expect(res.body.message).toEqual('Error');
      });
  });
});


describe('API TESTS - Get Product Service - /api/products/productId', () => {
  test('Find product by id', async () => {
    Product.findById = jest.fn().mockReturnValue([mockResponseData]);
    await request(app)
      .get('/api/products/productId')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ product: [mockResponseData] });
      });
  });

});