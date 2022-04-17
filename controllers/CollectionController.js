const { Collection, Lot } = require("../models/index");

class CollectionController {
  static async fetchCollections(req, res, next) {
    try {
      const collections = await Collection.findAll({
        include: {
          model: Lot,
        },
      });
      res.status(200).json(collections);
    } catch (error) {
      next(error);
    }
  }

  static async fetchCollection(req, res, next) {
    try {
      const { id } = req.params;

      const collection = await Collection.findOne({ where: { id }, include: { model: Lot } });

      if (!collection) throw { name: "Not found" };

      res.status(200).json(collection);
    } catch (error) {
      next(error);
    }
  }

  static async addCollection(req, res, next) {
    try {
      const { name, imgUrl, description, startDate, endDate } = req.body;
      const obj = {
        name,
        imgUrl,
        description,
        startDate,
        endDate,
        AdminId: req.user.id,
      };

      const collection = await Collection.create(obj);

      res.status(200).json(collection);
    } catch (error) {
      next(error);
    }
  }

  static async updateCollectionById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, imgUrl, description, startDate, endDate } = req.body;

      const collection = await Collection.findByPk(id);
      if (!collection) throw { name: "Not found" };

      const obj = {
        name,
        imgUrl,
        description,
        startDate,
        endDate,
      };

      await Collection.update(obj, { where: { id } });
      res.status(200).json({ message: "Update success" });
    } catch (error) {
      next(error);
    }
  }

  static async updateCollectionGalleryName(req, res, next) {
    try {
      const { id } = req.params;
      const { galleryName } = req.body;

      const collection = await Collection.findByPk(id);
      if (!collection) throw { name: "Not found" };

      await Collection.update({ galleryName }, { where: { id } });
      res.status(200).json({ message: "Update success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCollectionById(req, res, next) {
    try {
      const { id } = req.params;

      const collection = await Collection.findByPk(id);
      if (!collection) throw { name: "Not found" };

      await Collection.destroy({ where: { id } });

      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollectionController;
