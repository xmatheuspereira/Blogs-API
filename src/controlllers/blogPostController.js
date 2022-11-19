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
};
