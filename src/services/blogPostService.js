const Sequelize = require('sequelize');
const db = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

module.exports = {
  getPosts: async () => {
    const getPosts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
    ] });
    return getPosts;
  },

  createPost: async (email, title, content, categoryIds) => {
    const t = await sequelize.transaction();

    const { dataValues } = await db.User.findOne({ where: { email } }, { transaction: t });
    const { id } = dataValues;

    const post = await db.BlogPost.create({ title, content, userId: id }, { transaction: t });

    await Promise.all(categoryIds.map(
      (categoryId) => db.PostCategory.create({ postId: post.dataValues.id, categoryId },
         { transaction: t }),
    ));

    await t.commit();
    const createdPost = await db.BlogPost.findByPk(post.id);
    return createdPost;
  },

  getPostById: async (id) => {
    const getPostById = await db.BlogPost.findByPk(
      id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
      ] },
    );
    return getPostById;
  },

  deletePost: async (id) => {
    const getPost = await db.BlogPost.findByPk(id);
    if (!getPost) return null;

    const deletePost = await db.BlogPost.destroy({ where: { id } });
    return deletePost;
  },
};
