const { Lot } = require("../models/index");
const { Op } = require("sequelize");

class LotController {
  static async fetchLots(req, res, next) {
    try {
      let { name, artistName, startingBid } = req.query;
      let orderBy;

      if (!name) name = "";
      if (!artistName) artistName = "";
      if (!startingBid) {
        orderBy = ["id", "ASC"];
      } else if (startingBid === "ASC") {
        orderBy = ["startingBid", "ASC"];
      } else {
        orderBy = ["startingBid", "DESC"];
      }

      const lots = await Lot.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
          artistName: { [Op.iLike]: `%${artistName}%` },
        },
        order: [orderBy],
      });
      res.status(200).json(lots);
    } catch (error) {
      next(error);
    }
  }

  static async fetchLot(req, res, next) {
    try {
      const { id } = req.params;

      const lot = await Lot.findOne({ where: { id } });

      if (!lot) throw { name: "Not found" };

      res.status(200).json(lot);
    } catch (error) {
      next(error);
    }
  }

  static async addLot(req, res, next) {
    try {
      const { name, description, width, height, size, startingBid, primaryImage, secondImage, thirdImage, fourthImage, artistName } = req.body;
      const obj = {
        name,
        description,
        width,
        height,
        size,
        startingBid,
        SellerId: req.user.id,
        primaryImage,
        secondImage,
        thirdImage,
        fourthImage,
        artistName,
      };

      const lot = await Lot.create(obj);

      res.status(200).json(lot);
    } catch (error) {
      next(error);
    }
  }

  static async updateLotById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, width, height, size, startingBid, primaryImage, secondImage, thirdImage, fourthImage, artistName } = req.body;

      const lot = await Lot.findByPk(id);
      if (!lot) throw { name: "Not found" };

      const obj = {
        name,
        description,
        width,
        height,
        size,
        startingBid,
        primaryImage,
        secondImage,
        thirdImage,
        fourthImage,
        artistName,
      };

      await Lot.update(obj, { where: { id } });
      res.status(200).json({ message: "Update success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLotById(req, res, next) {
    try {
      const { id } = req.params;

      const lot = await Lot.findByPk(id);
      if (!lot) throw { name: "Not found" };

      await Lot.destroy({ where: { id } });

      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LotController;
