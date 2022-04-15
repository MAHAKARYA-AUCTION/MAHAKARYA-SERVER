const router = require("express").Router();
const LotController = require("../controllers/LotController");
// const authN = require("../middlewares/auth");

router.get("/lots", LotController.fetchLots);
router.get("/lots/:id", LotController.fetchLot);
// router.use(authN);
router.post("/lots", LotController.addLot);
router.put("/lots/:id", LotController.updateLotById);
router.delete("/lots/:id", LotController.deleteLotById);

module.exports = router;
