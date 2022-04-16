const router = require("express").Router();
const LotController = require("../controllers/LotController");
const { authN, authZSeller } = require("../middlewares/auth");

router.get("/lots", LotController.fetchLots);
router.get("/lots/:id", LotController.fetchLot);
router.post("/lots", authN, authZSeller, LotController.addLot);
router.put("/lots/:id", authN, authZSeller, LotController.updateLotById);
router.delete("/lots/:id", authN, authZSeller, LotController.deleteLotById);

module.exports = router;
