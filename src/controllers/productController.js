import { productService } from '../services/productService';

export const productController = {

  async getProducts(req, res, next) {
    try {
      console.log(req);
      const { statusCode, responseObj } = await productService.getProducts();
      res.status(statusCode).json(responseObj);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async getProduct(req, res, next) {
    const { productId } = req.params;
    try {
      const { statusCode, responseObj } = await productService.getProduct(productId);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

}