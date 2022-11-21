const { StatusCodes } = require('http-status-codes');
// const userService = require('../services/userService');
// const db = require('../models');
const JWT = require('../utils/JWT');

module.exports = {

  isThePostOwner: async (req, res, next) => {
    // const { id } = req.params;
    const { authorization } = req.headers;
    const email = req.user;
    try {
      // const { dataValues } = await db.BlogPost.findOne({ where: { id } });
      // const { userId } = dataValues;

      // const user = await userService.getUserById(String(userId));
      const isValidToken = JWT.isValidToken(authorization);
      console.log('isValidToken===================', isValidToken);
      console.log('Email===============', email);
  
      if (email !== isValidToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
