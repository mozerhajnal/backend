import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import User from '../models/userModel';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import Purchase from '../models/purchaseModel';

export const orderService = {
  async getPendingOrdersByUserId(userId) {
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

    let pendingOrders;
    try {
      pendingOrders = await Order.find({ userId, status: 'pending' });
    } catch (err) {
      throw createHttpError(500, { message: err.message });
    }

    const resObj = pendingOrders.map(
      ({
        _id,
        status,
        orderDate,
        name,
        price,
        quantity,
        productImage,
        productId,
      }) => ({
        id: _id,
        status,
        orderDate,
        name,
        price,
        quantity,
        productImage,
        productId,
      })
    );
    return {
      statusCode: 200,
      responseObj: { orders: resObj },
    };
  },

  async addPendingOrdersByUserId(userId, productId, quantity) {
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

    let product;
    try {
      product = await Product.findById(productId);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError)
        throw createHttpError(400, { message: 'Invalid parameter' });
      throw createHttpError(500, { message: err.message });
    }

    if (!product) {
      throw createHttpError(400, { message: 'Product not found' });
    }

    let savedOrder;
    try {
      const newItem = new Order({
        userId,
        status: 'pending',
        orderDate: Date.now(),
        name: product.name,
        price: product.price,
        productImage: product.productImage,
        quantity,
        productId,
      });
      savedOrder = await newItem.save();
    } catch (err) {
      throw createHttpError(500, { message: err.message });
    }

    const resObj = {
      id: savedOrder._id,
      status: savedOrder.status,
      orderDate: savedOrder.orderDate,
      name: savedOrder.name,
      price: savedOrder.price,
      quantity: savedOrder.quantity,
    };

    return {
      statusCode: 200,
      responseObj: { orders: resObj },
    };
  },

  async removeAllPendingOrder(userId) {
    try {
      const deleteResult = await Order.deleteMany({
        userId,
        status: 'pending',
      });
      return {
        statusCode: 200,
        responseObj: {
          deleted: deleteResult,
        },
      };
    } catch (err) {
      throw createHttpError(500, { message: err.message });
    }
  },

  async removeItem(orderId) {
    try {
      const orderItem = await Order.findByIdAndRemove(orderId);
      if (!orderItem) {
        throw createHttpError(400, { message: 'Order not found' });
      }

      return {
        statusCode: 200,
        responseObj: { orderItem },
      };
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
  },

  async buyProduct(userId, totalPaid) {
    const pendingOrders = await Order.find({ userId, status: 'pending' });
    const initialValue = 0;
    if (!pendingOrders.length)
      throw createHttpError(400, { message: 'Üres a kosár!' });

    const totalToPay = pendingOrders
      .map(item => parseInt(item.price * item.quantity, 10))
      .reduce((prev, next) => prev + next, initialValue);

    if (totalToPay === totalPaid) {
      await Order.updateMany({ userId, status: 'pending' }, { status: 'paid' });

      const purchases = pendingOrders.map(
        order =>
          new Purchase({
            status: 'paid',
            paidDate: Date.now(),
            paidAmount: totalPaid,
            userId: order.userId,
            productId: order.productId,
          })
      );
      try {
        await Purchase.insertMany(purchases);
        return {
          statusCode: 200,
          responseObj: { purchases },
        };
      } catch (error) {
        throw createHttpError(500, { message: error.message });
      }
    } else {
      throw createHttpError(400, { message: 'Not enough money' });
    }
  },
};
