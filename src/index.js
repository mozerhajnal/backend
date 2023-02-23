import logger from './logger';
import app from './app';
import initDBConnection from './data/mongoDBConnect';
import config from './config';

const PORT = config.port || 8080;

const runServer = async () => {
  await initDBConnection();

  app
    .listen(PORT, async () => {
      logger.info(`Server is listening on port: ${PORT}`);
    })
    .on('error', (error) => {
      logger.error(error.message);
    });
};

runServer();