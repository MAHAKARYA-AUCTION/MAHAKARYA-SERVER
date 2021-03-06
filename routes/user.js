const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authNUser } = require("../middlewares/auth");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users/:id", UserController.updateUserById);
router.delete("/users/:id", authNUser, UserController.deleteUserById);
router.get("/users/:id", 
authNUser,
 UserController.getUserById)

module.exports = router;
