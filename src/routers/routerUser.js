const { Router } = require('express');
const userController = require('../controlllers/userController');

const routerUser = Router();

routerUser.post('/', userController.addUser);

module.exports = routerUser;
