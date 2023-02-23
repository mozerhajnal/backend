import { orderService } from '../services/orderService';

export const orderController = {
  async getUserPendingOrders(req, res, next) {
    const { userId } = req.params;
    try {
      const { statusCode, responseObj } =
        await orderService.getPendingOrdersByUserId(userId);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async addUserPendingOrders(req, res, next) {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
      const { statusCode, responseObj } =
        await orderService.addPendingOrdersByUserId(
          userId,
          productId,
          quantity
        );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async removeAllPendingOrder(req, res, next) {
    const { userId } = req.user;
    try {
      const { statusCode, responseObj } =
        await orderService.removeAllPendingOrder(userId);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async removeItem(req, res, next) {
    const { orderId } = req.params;
    try {
      const { statusCode, responseObj } = await orderService.removeItem(
        orderId
      );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async buyProduct(req, res, next) {
    const { userId } = req.params;
    const { totalPaid } = req.body;
    try {
      const { statusCode, responseObj } = await orderService.buyProduct(
        userId,
        totalPaid
      );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
