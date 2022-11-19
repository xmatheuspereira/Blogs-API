const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const blogPostService = require('../services/blogPostService');

module.exports = {

  getPosts: async (_req, res) => {
    try {
      const getPosts = await blogPostService.getPosts();
      return res.status(StatusCodes.OK).json(getPosts);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params;

    try {
      const getPostById = await blogPostService.getPostById(id);
      if (!getPostById) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post does not exist' });
      }
      return res.status(StatusCodes.OK).json(getPostById);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
