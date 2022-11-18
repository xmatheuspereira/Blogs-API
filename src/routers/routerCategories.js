const { Router } = require('express');
const categoriesController = require('../controlllers/categoriesController');
const { authToken } = require('../middlewares/authToken');

const routerCategories = Router();

routerCategories.use(authToken)
                .post('/', categoriesController.createCategory);

module.exports = routerCategories;
