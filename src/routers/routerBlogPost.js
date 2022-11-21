const { Router } = require('express');
const blogPostController = require('../controlllers/blogPostController');
const { authToken } = require('../middlewares/authToken');
const { isThePostOwner } = require('../middlewares/isThePostOwner');
const { postValidation } = require('../middlewares/postValidation');

const routerBlogPost = Router();

routerBlogPost.use(authToken)
              .post('/', postValidation, blogPostController.createPost)
              .get('/', blogPostController.getPosts)
              .get('/:id', blogPostController.getPostById)
              .delete('/:id', isThePostOwner, blogPostController.deletePost);

module.exports = routerBlogPost;
