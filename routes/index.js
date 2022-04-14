const router = require("express").Router();
const lot = require("./lot");

router.use("/", lot);

module.exports = router;
