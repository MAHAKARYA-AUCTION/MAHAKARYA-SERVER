const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users/:id", UserController.updateUserById);
router.delete("/users/:id", UserController.deleteUserById);

module.exports = router;
