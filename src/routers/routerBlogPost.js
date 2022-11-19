const { Router } = require('express');
const blogPostController = require('../controlllers/blogPostController');
const { authToken } = require('../middlewares/authToken');

const routerBlogPost = Router();

routerBlogPost.use(authToken)
              .get('/', blogPostController.getPosts)
              .get('/:id', blogPostController.getPostById);

module.exports = routerBlogPost;
