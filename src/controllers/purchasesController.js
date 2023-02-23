import { purchasesService } from '../services/purchasesService';

export const purchasesController = {
  async getPurchases(req, res, next) {
    const { userId } = req.params;
    try {
      const { statusCode, responseObj } = await purchasesService.getPurchases(userId);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

}