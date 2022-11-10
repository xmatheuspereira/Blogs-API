const Joi = require('joi');
const db = require('../models');
const JWT = require('../utils/JWT');

const loginSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {

isValidUser: async (displayName, email, password) => {
    const { error } = loginSchema.validate({ displayName, email, password });
    if (error) {
      return error.message;
    }
  },

  addUser: async (displayName, email, password, image) => {
    const getUser = await db.User.findOne({ where: { email } });

    if (getUser) {
      return null;
    }

    db.User.create({ displayName, email, password, image });
    const token = JWT.createToken(email);
    return token;
  },
};
