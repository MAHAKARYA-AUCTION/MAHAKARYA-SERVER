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
}

module.exports = LotController;
