const router = require("express").Router();
const LotController = require("../controllers/LotController");

router.get("/lots", LotController.fetchLots);

module.exports = router;
