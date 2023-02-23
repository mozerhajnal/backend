import { adminService } from '../services/adminService';

export const adminController = {

  async deleteProduct (req, res, next) {
    const { id } = req.params;
    try {
      const { statusCode, responseObj } = await adminService.deleteProduct(id);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

  async addProduct(req, res, next) {
    const {files} = req;
    const {
      id, name, price, sku, description, quantity, category
    } = req.body;

    const product = {
      id, name, price, sku, description, quantity, category
    };

    try {
      const { statusCode, responseObj } = await adminService.addProduct(files, product);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

  async modifyProduct(req, res, next) {
    const {files} = req;
    const { productId } = req.params;
    const {
      name, price, sku, description, quantity, category, image
    } = req.body;

    const product = {
      name, price, sku, description, quantity, category, image
    };

    try {
      const { statusCode, responseObj } = await adminService.modifyProduct(files, product, productId);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

}