const Joi = require('joi');
const db = require('../models');
const JWT = require('../utils/JWT');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {

  isValidUser: (displayName, email, password) => {
    const { error } = userSchema.validate({ displayName, email, password });

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

  getUsers: async () => {
    const getUsers = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return getUsers;
  },

  getUserById: async () => {
    const getUsers = await db.User.findByPk({
      attributes: { exclude: ['password'] },
    });
    return getUsers;
  },
};
