const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/loginService');

module.exports = {

  isValidLogin: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
    }
    const user = await loginService.login(email, password);
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
      }
    next();
  },
};
