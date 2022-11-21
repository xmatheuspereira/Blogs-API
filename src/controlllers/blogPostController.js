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

  createPost: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const email = req.user;

    try {
      const newPost = await blogPostService.createPost(email, title, content, categoryIds);
      if (!newPost) {
        return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: '"categoryIds" not found' });
      }
      return res.status(StatusCodes.CREATED).json(newPost);
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

  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const getPost = await blogPostService.deletePost(id);
      if (!getPost) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post does not exist' });
      }
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },

  getSearch: async (req, res) => {
    const { q } = req.query;
    try {
      const result = await blogPostService.getSearch(q);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
