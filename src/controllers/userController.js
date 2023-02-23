import { userService } from '../services';

export const userController = {
  async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const { statusCode, responseObj } = await userService.registerUser(
        name,
        email,
        password,
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const { statusCode, resObj } = await userService.loginUser(
        email,
        password,
      );
      return res.status(statusCode).json(resObj);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    const { name, email, password } = req.body;
    const { userId } = req.user;
    try {
      const { statusCode, resObj } = await userService.updateUser(
        userId,
        name,
        email,
        password,
      );
      return res.status(statusCode).json(resObj);
    } catch (error) {
      return next(error);
    }
  },
};
