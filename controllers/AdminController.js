const { compareHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin } = require("../models/index");

class AdminController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const obj = {
        username,
        email,
        password,
      };
      const admin = await Admin.create(obj);
      res.status(201).json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Invalid email/password" };

      const admin = await Admin.findOne({
        where: { email },
      });

      if (!admin) throw { name: "Invalid email/password" };

      const checkPassword = compareHash(password, admin.password);

      if (!checkPassword) throw { name: "Invalid email/password" };

      const payload = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      };

      const token = signToken(payload);

      res.status(200).json({
        message: "Login success",
        admin: payload,
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
