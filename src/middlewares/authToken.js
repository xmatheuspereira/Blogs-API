const { StatusCodes } = require('http-status-codes');
const JWT = require('../utils/JWT');

module.exports = {
  authToken: (req, res, next) => {
    const { authorization } = req.headers;
  
    try {
      if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
      }

      const isValidToken = JWT.isValidToken(authorization);
      req.user = isValidToken;

      if (!isValidToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};
