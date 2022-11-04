const { Router } = require('express');
const loginController = require('../controlllers/loginController');
const { isValidLogin } = require('../middlewares/authLogin');

const routerLogin = Router();

routerLogin.post('/', isValidLogin, loginController.login);

module.exports = routerLogin;
