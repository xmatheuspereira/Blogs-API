const { Router } = require('express');
const userController = require('../controlllers/userController');
const { authToken } = require('../middlewares/authToken');

const routerUser = Router();

routerUser
          .post('/', userController.addUser)
          .use(authToken)
          .get('/', userController.getUsers)
          .get('/:id', userController.getUserById)
          .delete('/me', userController.deleteUser);

module.exports = routerUser;
