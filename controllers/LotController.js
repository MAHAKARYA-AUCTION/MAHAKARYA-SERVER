const { Lot } = require("../models/index");

class LotController {
  static async fetchLots(req, res, next) {
    try {
      const lots = await Lot.findAll();
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
      if (!lot) throw { message: "Not found" };

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
