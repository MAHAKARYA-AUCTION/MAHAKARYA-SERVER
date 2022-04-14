const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.KEYWORD);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.KEYWORD);
};

module.exports = { signToken, verifyToken };
