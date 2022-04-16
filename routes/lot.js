const router = require("express").Router();
const LotController = require("../controllers/LotController");
const { authNAdmin, authZAdmin } = require("../middlewares/auth");

router.get("/lots", LotController.fetchLots);
router.get("/lots/:id", LotController.fetchLot);
router.post("/lots", authNAdmin, authZAdmin, LotController.addLot);
router.put("/lots/:id", authNAdmin, authZAdmin, LotController.updateLotById);
router.delete("/lots/:id", authNAdmin, authZAdmin, LotController.deleteLotById);

module.exports = router;
