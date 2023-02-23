import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password is required.',
    'string.min': 'Password must be at least 8 characters.',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'Name can not be empty',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email can not be empty',
    }),
  password: Joi.string().min(8).messages({
    'string.empty': 'Password can not be empty',
    'string.min': 'Password must be at least 8 characters.',
  }),
});

export const newsLetterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email can not be empty',
    }),
});
