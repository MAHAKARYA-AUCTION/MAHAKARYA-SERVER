const router = require("express").Router();
const CollectionController = require("../controllers/CollectionController");
const { authNAdmin } = require("../middlewares/auth");

router.get("/collections", CollectionController.fetchCollections);
router.get("/collections/:id", CollectionController.fetchCollection);
router.post("/collections", authNAdmin, CollectionController.addCollection);
router.put("/collections/:id", authNAdmin, CollectionController.updateCollectionById);
router.patch("/collections/:id", authNAdmin, CollectionController.updateCollectionGalleryName);
router.delete("/collections/:id", authNAdmin, CollectionController.deleteCollectionById);

module.exports = router;
