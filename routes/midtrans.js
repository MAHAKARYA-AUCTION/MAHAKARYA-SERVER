const router = require("express").Router();
const MidtransController = require('../controllers/MidtransController')

router.post("/topup", MidtransController.topup);
router.post("/callback/midtrans", MidtransController.callbackMidtrans)

module.exports = router;