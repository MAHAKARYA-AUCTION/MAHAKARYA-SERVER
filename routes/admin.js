const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

router.post("/admins/register", AdminController.register);
router.post("/admins/login", AdminController.login);

module.exports = router;
