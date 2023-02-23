import createHttpError from 'http-errors';
import NewsLetter from '../models/newsLetterModel';

export const newsLetterService = {
  async signup(email) {
    const emailExist = await NewsLetter.findOne({ email });
    if (emailExist) {
      throw createHttpError(409, { message: 'You\'re Already Subscribed!' });
    }
    const emailAddress = new NewsLetter({
      email,
    });
    try {
      const savedEmailAddress = await emailAddress.save();
      return {
        statusCode: 200,
        responseObj: {
          id: savedEmailAddress._id,
          email: savedEmailAddress.email,
        },
      };
    } catch (err) {
      throw createHttpError(500, { message: err });
    }
  },
}