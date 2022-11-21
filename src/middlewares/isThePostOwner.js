const { StatusCodes } = require('http-status-codes');
const blogPostService = require('../services/blogPostService');
const db = require('../models');

module.exports = {

  isThePostOwner: async (req, res, next) => {
    const { id } = req.params;
    const email = req.user;
    const isThePostOwner = await blogPostService.getPostById(Number(id));
    const user = await db.User.findOne({ where: { email } });
      if (isThePostOwner !== null && isThePostOwner.userId !== user.id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
      }
    next();
  },
};
