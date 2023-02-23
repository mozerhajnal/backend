import { newsLetterService } from '../services';

export const newsLetterController = {
  async signup(req, res, next) {
    const { email } = req.body;
    try {
      const { statusCode, responseObj } = await newsLetterService.signup(email);
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
