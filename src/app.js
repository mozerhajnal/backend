import express from 'express';
import morgan from 'morgan';

import { api, documentation  } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/api-docs', documentation);

app.use(express.static(`${__dirname  }/public`));
app.use('/images', express.static('images'));

app.use(errorHandler);

export default app;
