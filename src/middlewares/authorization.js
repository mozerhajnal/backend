import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import config from '../config';

export const authorization = {
  verifyToken(req, res, next) {
    try {
      const bearerHeader = req.header('Authorization');
      const token = bearerHeader.split(' ')[1];
      const verified = jwt.verify(token, config.token_key);
      req.user = verified;
      next();
    } catch (err) {
      next(createHttpError(401, { status: 'error', message: 'Invalid token' }));
    }
  },

  isAdmin(req, res, next) {
    if (!req.user.isAdmin) next(createHttpError(401, { status: 'error', message: 'Unauthorized access' }));
    next();
  },

  checkUserIdAuthorization(req, res, next) {
    const { userId } = req.params;
    if ((req.user.userId !== userId)) next(createHttpError(401, { status: 'error', message: 'Unauthorized access' }));
    next();
  },
};
