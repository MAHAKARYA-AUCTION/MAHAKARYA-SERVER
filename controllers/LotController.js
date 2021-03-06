const { Lot, Collection, User } = require("../models/index");
const { Op } = require("sequelize");
const { sequelize } = require("../models/index");
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
        where,
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

      const lot = await Lot.findOne({ include: [{ model: Collection }, { model: User }], where: { id } });

      if (!lot) throw { name: "Not found" };

      res.status(200).json(lot);
    } catch (error) {
      next(error);
    }
  }

  static async fetchLotsByCollectionId(req, res, next) {
    try {
      const { CollectionId } = req.params;
      let { name, artistName, startingBid, priceValue, orientation, size } = req.query;
      let orderBy;

      if (!name) name = "";
      if (!artistName) artistName = "";

      let where = {
        CollectionId,
        name: { [Op.iLike]: `%${name}%` },
        artistName: { [Op.iLike]: `%${artistName}%` },
      }

      if (priceValue) {
        where = {
          ...where,
          startingBid: { [Op.between]: [priceValue[0], priceValue[1]] }
        }
      }

      if (orientation) {
        if (orientation === "landscape") {
          where = {
            ...where,
            width: {
              [Op.gt]
                : sequelize.col('height')
            }
          }
        } else {
          where = {
            ...where,
            width: {
              [Op.lt]
                : sequelize.col('height')
            }
          }
        }
      }
      //  < 100 small , 100 - 150 medium, > 150 large
      if (size) {
        if (size === "big") {
          where = {
            ...where,
            width: {
              [Op.gt]
                : 150
            },
            height: {
              [Op.gt]
                : 100
            }
          }
        } else if (size === "medium") {
          where = {
            ...where,
            width: {
              [Op.between]
                : [100, 150]
            },
            height: {
              [Op.between]
                : [65, 100]
            }
          }

        } else {
          where = {
            ...where,
            width: {
              [Op.lt]
                : 100
            },
            height: {
              [Op.lt]
                : 65
            }
          }
        }
      }

      if (!startingBid) {
        orderBy = ["id", "ASC"];
      } else if (startingBid === "ASC") {
        orderBy = ["startingBid", "ASC"];
      } else {
        orderBy = ["startingBid", "DESC"];
      }

      const lots = await Lot.findAll({
        where,
        order: [orderBy],
      });

      res.status(200).json(lots);
    } catch (error) {
      next(error);
    }
  }

  static async addLot(req, res, next) {
    try {
      const { name, description, width, height, startingBid, SellerId, CollectionId, primaryImage, secondImage, thirdImage, artistName } = req.body;

      const collection = await Collection.findByPk(CollectionId);
      if (!collection) throw { name: "Collection not found" };

      const totalLots = await Lot.findAll({ where: { CollectionId } });

      const obj = {
        name,
        description,
        width,
        height,
        size: `${width} x ${height} cm`,
        startingBid,
        SellerId,
        CollectionId,
        primaryImage,
        secondImage,
        thirdImage,
        artistName,
        lotNumber: totalLots.length + 1,
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
      const { name, description, width, height, startingBid, primaryImage, secondImage, thirdImage, artistName } = req.body;

      const lot = await Lot.findByPk(id);
      if (!lot) throw { name: "Not found" };

      const obj = {
        name,
        description,
        width,
        height,
        size: `${width} x ${height} cm`,
        startingBid,
        primaryImage,
        secondImage,
        thirdImage,
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
