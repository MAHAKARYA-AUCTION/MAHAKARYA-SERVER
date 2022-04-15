const router = require("express").Router();
const admin = require("./admin");
const user = require("./user");
const lot = require("./lot");

router.use("/", lot);
router.use("/", admin);
router.use("/", user);

module.exports = router;
