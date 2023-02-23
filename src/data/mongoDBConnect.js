import mongoose from 'mongoose';
import config from '../config';
import logger from '../logger';

const initDBConnection = async () => {
  try {
    mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connection successful');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit();
  }
};

export default initDBConnection;
