const Joi = require('joi');
// const { User } = require('../models/User');
const JWT = require('../utils/JWT');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  login: async (email, password) => {
    const { error } = loginSchema.validate({ email, password });
    if (error) return null;
    
    const token = JWT.createToken(email);
    return token;

    // const getUser = await User.findOne({ where: { email, password } });
    // if (!getUser) return null;
  },
};
