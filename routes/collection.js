const router = require("express").Router();
const CollectionController = require("../controllers/CollectionController");
const { authNAdmin, authZAdmin } = require("../middlewares/auth");

router.get("/collections", CollectionController.fetchCollections);
router.get("/collections/:id", CollectionController.fetchCollection);
router.post("/collections", authNAdmin, authZAdmin, CollectionController.addCollection);
router.put("/collections/:id", authNAdmin, authZAdmin, CollectionController.updateCollectionById);
router.patch("/collections/:id", authNAdmin, authZAdmin, CollectionController.updateCollectionGalleryName);
router.delete("/collections/:id", authNAdmin, authZAdmin, CollectionController.deleteCollectionById);

module.exports = router;
