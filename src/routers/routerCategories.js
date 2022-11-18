const { Router } = require('express');
const categoriesController = require('../controlllers/categoriesController');
const { authToken } = require('../middlewares/authToken');

const routerCategories = Router();

routerCategories.use(authToken)
                .post('/', categoriesController.createCategory)
                .get('/', categoriesController.getCategories);

module.exports = routerCategories;
