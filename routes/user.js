const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authN } = require("../middlewares/auth");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users/:id", authN, UserController.updateUserById);
router.delete("/users/:id", authN, UserController.deleteUserById);

module.exports = router;
