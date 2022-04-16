const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authN = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "JsonWebTokenError" };

    const payload = verifyToken(access_token);

    if (!payload) throw { name: "JsonWebTokenError" };

    const user = await User.findOne({ where: { id: payload.id, email: payload.email } });

    if (!user) throw { name: "JsonWebTokenError" };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authZBuyer = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "buyer") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};

const authZSeller = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "seller") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authN,
  authZBuyer,
  authZSeller,
};
