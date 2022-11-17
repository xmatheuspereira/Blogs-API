require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: '7d',
        algorithm: 'HS256',
    });
    return token;
  },

  isValidToken: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (_err) {
      return null;
    }
  },
};
