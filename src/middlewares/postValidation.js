const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const categoriesService = require('../services/categoriesService');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1),
});

module.exports = {
  postValidation: async (req, res, next) => {
   const { title, content, categoryIds } = req.body;
   
    const { error } = postSchema.validate({ title, content, categoryIds });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
    }
    const categories = await categoriesService.getCategories();
    const categoryExists = categoryIds.reduce((acc, id) => categories
    .map((category) => category.id).includes(id) && acc, true);
    if (!categoryExists) {
      return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'one or more "categoryIds" not found' });
    }
   next();
 },
};
