const { Router } = require('express');
const userController = require('../controlllers/userController');
const { authToken } = require('../middlewares/authToken');
// const { isValidToken } = require('../utils/JWT');

const routerUser = Router();

routerUser
          .post('/', userController.addUser)
          .get('/', authToken, userController.getUsers);

module.exports = routerUser;
