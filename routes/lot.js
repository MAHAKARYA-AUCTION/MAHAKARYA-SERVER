const router = require("express").Router();
const LotController = require("../controllers/LotController");

const { authNAdmin } = require("../middlewares/auth");

router.get("/lots", LotController.fetchLots);
router.get("/lots/:id", LotController.fetchLot);
router.get("/lots/collections/:CollectionId", LotController.fetchLotsByCollectionId);
router.post("/lots", authNAdmin, LotController.addLot);
router.put("/lots/:id", authNAdmin, LotController.updateLotById);
router.delete("/lots/:id", authNAdmin, LotController.deleteLotById);

module.exports = router;
