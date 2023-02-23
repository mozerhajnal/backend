import mongoose from 'mongoose';
import logger from '../logger';
import initDBConnection from './mongoDBConnect';

import users from './users';
import User from '../models/userModel';
import products from './products';
import Product from '../models/productModel';
import orders from './orders';
import Order from '../models/orderModel';
import purchases from './purchases';
import Purchase from '../models/purchaseModel';
import newsletters from './newsletters';
import NewsLetter from '../models/newsLetterModel';

const loadData = async () => {
  try {
    await initDBConnection();

    
    logger.info('Delete old documents.');
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Purchase.deleteMany();
    await NewsLetter.deleteMany();

    await User.insertMany(users);
    await Product.insertMany(products);
    await Order.insertMany(orders);
    await Purchase.insertMany(purchases);
    await NewsLetter.insertMany(newsletters);
    logger.info('collections initialized');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
  } finally {
    mongoose.disconnect(() => {
      logger.info('Mongoose connection closed');
      process.exit(0);
    });
  }
};

loadData();