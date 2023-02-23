import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/userModel';

export const userService = {
  async registerUser(name, email, password) {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw createHttpError(400, { message: 'Email is already taken.' });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: encryptedPassword,
    });
    try {
      const savedUser = await user.save();
      return {
        statusCode: 200,
        responseObj: {
          id: savedUser._id,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
          isVerified: savedUser.isVerified,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err });
    }
  },
  async loginUser(email, password) {
    if (!email && !password)
      throw createHttpError(400, { message: 'All fields are required.' });
    if (!email) throw createHttpError(400, { message: 'Email is required.' });
    if (!password)
      throw createHttpError(400, { message: 'Password is required.' });

    try {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const { _id, name, isAdmin, isVerified } = user;

        const token = jwt.sign(
          {
            userId: _id,
            name,
            email,
            isAdmin,
            isVerified,
          },
          config.token_key
        );
        return { statusCode: 200, resObj: { status: 'ok', token } };
      }
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
    throw createHttpError(400, { message: 'Email or password is incorrect.' });
  },

  async updateUser(_id, name, email, password) {
    let userData = new User();
    let emailExist;

    try {
      userData = await User.findById({ _id });
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) throw createHttpError(400, { message: 'Invalid user id' });
      throw createHttpError(500, { message: err.message });
    }

    if (!userData) {
      throw createHttpError(400, { message: 'User not found' });
    }

    if (email && email !== userData.email) {
      try {
        emailExist = await User.findOne({ email });
      } catch (err) {
        throw createHttpError(500, { message: err.message });
      }

      if (emailExist) {
        throw createHttpError(400, { message: 'Email is already taken.' });
      }
      userData.email = email;
    }

    if (name) userData.name = name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      userData.password = encryptedPassword;
    }

    const user = new User(userData);
    try {
      const savedUser = await user.save();
      const newToken = jwt.sign(
        {
          userId: savedUser._id,
          isAdmin: savedUser.isAdmin,
          isVerified: savedUser.isVerified,
          name: savedUser.name,
          email: savedUser.email,
        },
        config.token_key,
        { expiresIn: '2h' },
      );

      return {
        statusCode: 200,
        resObj: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          token: newToken,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },

};
