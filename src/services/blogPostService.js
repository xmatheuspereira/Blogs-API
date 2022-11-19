// const Joi = require('joi');
const db = require('../models');

module.exports = {
  getPosts: async () => {
    const getPosts = await db.BlogPost.findAll({ 
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', attributes: ['id', 'name'] },
    ] });
    return getPosts;
  },
};
