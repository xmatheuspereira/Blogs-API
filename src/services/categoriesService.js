const Joi = require('joi');
const db = require('../models');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {

  isValidCategory: (name) => {
    const { error } = categoriesSchema.validate(name);

    if (error) {
      return error.message;
    }
  },

  createCategory: (name) => {
    const category = db.Category.create(name);
    return category;
  },

  getCategories: async () => {
    const getCategories = await db.Category.findAll();
    return getCategories;
  },
};
