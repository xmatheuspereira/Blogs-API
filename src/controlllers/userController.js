const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const userService = require('../services/userService');

module.exports = {
  addUser: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
      const error = await userService.isValidUser(displayName, email, password);
      if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error });

      const user = await userService.addUser(displayName, email, password, image);
      if (!user) {
        return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
      }
      return res.status(StatusCodes.CREATED).json({ token: user });
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
