const { verifyToken } = require("../helpers/jwt");
const { User, Admin } = require("../models/index");

const authNUser = async (req, res, next) => {
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

const authNAdmin = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "JsonWebTokenError" };

    const payload = verifyToken(access_token);

    if (!payload) throw { name: "JsonWebTokenError" };

    const admin = await Admin.findOne({ where: { id: payload.id, email: payload.email } });

    if (!admin) throw { name: "JsonWebTokenError" };

    req.user = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
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

// const authZSeller = async (req, res, next) => {
//   try {
//     const { role } = req.user;

//     if (role !== "seller") throw { name: "Forbidden" };

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const authZAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "admin") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authNUser,
  authNAdmin,
  authZBuyer,
  // authZSeller,
  authZAdmin,
};
