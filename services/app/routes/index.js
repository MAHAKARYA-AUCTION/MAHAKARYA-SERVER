const express = require("express")
const router = express.Router()
const routerUser = require("./user")

router.use(routerUser)

module.exports = router