import createHttpError from 'http-errors';
import { registerSchema, updateUserSchema, newsLetterSchema } from '../utils/validation';

export const registerValidator = {
  async validator(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        return next(
          createHttpError(400, {
            message: 'Name, email and password are required.',
          }),
        );
      }
      const validated = await registerSchema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(400, { message: err.message }));
      }
    }
    return req.body;
  },

};

export const updateUserValidator = {
  async validator(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        return next(
          createHttpError(400, {
            message: 'A field is required.',
          }),
        );
      }
      const validated = await updateUserSchema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(400, { message: err.message }));
      }
    }
    return req.body;
  },
};

export const newsLetterValidator = {
  async validator(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        return next(
          createHttpError(400, {
            message: 'A field is required.',
          }),
        );
      }
      const validated = await newsLetterSchema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(400, { message: err.message }));
      }
    }
    return req.body;
  },
};