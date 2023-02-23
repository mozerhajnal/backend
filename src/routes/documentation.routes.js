import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import logger from '../logger';

const router = express.Router();

let swaggerDocument;
try {
  swaggerDocument = YAML.load('openAPIDocumentation/openapi.yaml');
} catch (error) {
  logger.error(
    'Missing openapi.yaml file. Run "npm run build-doc" in backend directory and restart the server with "npm start".',
  );
}

const swaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: false,
    supportedSubmitMethods: [],
  },
};

router.use(
  '/',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, swaggerOptions),
);

export default router;
