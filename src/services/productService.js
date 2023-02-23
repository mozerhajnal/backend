import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Product from '../models/productModel';

export const productService = {
  async getProducts() {
    try {
      const products = await Product.find();
      return {
        statusCode: 200,
        responseObj: { products },
      };
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
  },
  async getProduct(productId) {
    let product;
    try {
      product = await Product.findById(productId);
      return {
        statusCode: 200,
        responseObj: { product },
      };
    } catch (err) {
      if (err instanceof mongoose.Error.CastError)
        throw createHttpError(400, { message: 'Invalid parameter' });
      throw createHttpError(500, { message: err.message });
    }
  },
};
