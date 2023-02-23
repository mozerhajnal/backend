import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Purchase from '../models/purchaseModel';
import User from '../models/userModel';

export const purchasesService = {
  async getPurchases(userId) {
    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError)
        throw createHttpError(400, { message: 'Invalid parameter' });
      throw createHttpError(500, { message: err.message });
    }

    if (!user) {
      throw createHttpError(400, { message: 'User not found' });
    }
    try {
      const purchases = await Purchase.find({ userId }).populate('productId');

      return {
        statusCode: 200,
        responseObj: { purchases },
      };
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
  },
};
