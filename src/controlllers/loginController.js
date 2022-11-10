const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const loginService = require('../services/loginService');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await loginService.login(email, password);
      return res.status(StatusCodes.OK).json({ token: user });
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
