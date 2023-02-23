import express from 'express';
import cors from 'cors';
import {
  userController,
  productController,
  adminController,
  orderController,
  newsLetterController,
  purchasesController
} from '../controllers';
import {
  registerValidator,
  updateUserValidator,
  newsLetterValidator
} from '../middlewares/validator';
import { authorization } from '../middlewares/authorization';
import { uploadImg } from '../middlewares/uploadImg';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registerValidator.validator, userController.register);
router.post('/login', userController.login);
router.patch(
  '/users',
  authorization.verifyToken,
  updateUserValidator.validator,
  userController.update
);
router.post('/newsletter', newsLetterValidator.validator, newsLetterController.signup);

router.get('/products', productController.getProducts);

router.get('/products/:productId', productController.getProduct);

router.get(
  '/orders/:userId',
  authorization.verifyToken,
  authorization.checkUserIdAuthorization,
  orderController.getUserPendingOrders
);

router.post(
  '/orders/:userId',
  authorization.verifyToken,
  orderController.addUserPendingOrders
);

router.patch(
  '/orders/:userId',
  authorization.verifyToken,
  authorization.checkUserIdAuthorization,
  orderController.buyProduct
);

router.delete(
  '/orders/',
  authorization.verifyToken,
  orderController.removeAllPendingOrder
);

router.delete(
  '/orders/:orderId',
  authorization.verifyToken,
  orderController.removeItem
);

router.get(
  '/purchases/:userId',
  authorization.verifyToken,
  authorization.checkUserIdAuthorization,
  purchasesController.getPurchases
);

router.post(
  '/admin/addproducts',
  authorization.verifyToken,
  authorization.isAdmin,
  uploadImg,
  adminController.addProduct
);

router.delete(
  '/admin/products/:id',
  authorization.verifyToken,
  authorization.isAdmin,
  adminController.deleteProduct
);

router.patch(
  '/admin/editproducts/:productId',
  authorization.verifyToken,
  authorization.isAdmin,
  uploadImg,
  adminController.modifyProduct
);

export default router;
