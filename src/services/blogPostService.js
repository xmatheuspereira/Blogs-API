// const Joi = require('joi');
const db = require('../models');

module.exports = {
  getPosts: async () => {
    const getPosts = await db.BlogPost.findAll({ 
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
    ] });
    return getPosts;
  },

  getPostById: async (id) => {
    const getPostById = await db.BlogPost.findByPk(
      id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' }, 
      ] },
    );

    if (!getPostById) return null;

    return getPostById;
  },
};
