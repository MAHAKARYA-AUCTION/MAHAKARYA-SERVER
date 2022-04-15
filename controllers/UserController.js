const { compareHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, ktp, phoneNumber, address, role } = req.body;
      const obj = {
        username,
        email,
        password,
        ktp,
        phoneNumber,
        address,
        role,
      };
      const user = await User.create(obj);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Invalid email/password" };

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "Invalid email/password" };

      const checkPassword = compareHash(password, user.password);

      if (!checkPassword) throw { name: "Invalid email/password" };

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      const token = signToken(payload);

      res.status(200).json({
        message: "Login success",
        user: payload,
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { username, password, ktp, phoneNumber, address } = req.body;

      const user = await User.findByPk(id);
      if (!user) throw { message: "Not found" };

      const obj = {
        username,
        password,
        ktp,
        phoneNumber,
        address,
      };

      await User.update(obj, { where: { id } });
      res.status(200).json({ message: "Update success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) throw { name: "Not found" };

      await User.destroy({ where: { id } });

      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;