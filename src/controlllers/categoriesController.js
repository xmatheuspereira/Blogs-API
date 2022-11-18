const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const categoriesService = require('../services/categoriesService');

module.exports = {

  createCategory: async (req, res) => {
    const name = req.body;
    try {
      const error = await categoriesService.isValidCategory(name);
      if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error });

      const category = await categoriesService.createCategory(name);

      return res.status(StatusCodes.CREATED).json(category);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },

  getCategories: async (_req, res) => {
    try {
      const getCategories = await categoriesService.getCategories();
      return res.status(StatusCodes.OK).json(getCategories);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
