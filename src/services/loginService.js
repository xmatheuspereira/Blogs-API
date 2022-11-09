const Joi = require('joi');
const db = require('../models');
const JWT = require('../utils/JWT');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  login: async (email, password) => {
    const { error } = loginSchema.validate({ email, password });
    if (error) return null;

    const getUser = await db.User.findOne({ where: { email } });
    if (!getUser) return null;
    
    const token = JWT.createToken(email);
    return token;
  },
};
