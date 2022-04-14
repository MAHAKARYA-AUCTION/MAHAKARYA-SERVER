const router = require("express").Router();
const admin = require("./admin");
const lot = require("./lot");

router.use("/", lot);
router.use("/", admin);

module.exports = router;
