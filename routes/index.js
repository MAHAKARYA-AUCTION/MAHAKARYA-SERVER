const router = require("express").Router();
const admin = require("./admin");
const user = require("./user");
const lot = require("./lot");
const collection = require("./collection");

router.use("/", admin);
router.use("/", user);
router.use("/", collection);
router.use("/", lot);

module.exports = router;
