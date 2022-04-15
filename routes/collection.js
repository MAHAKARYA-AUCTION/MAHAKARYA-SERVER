const router = require("express").Router();
const CollectionController = require("../controllers/CollectionController");

router.get("/collections", CollectionController.fetchCollections);
router.get("/collections/:id", CollectionController.fetchCollection);
router.post("/collections", CollectionController.addCollection);
router.put("/collections/:id", CollectionController.updateCollectionById);
router.delete("/collections/:id", CollectionController.deleteCollectionById);

module.exports = router;
