const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const usersController = require("../services/user.services");
const router = express.Router();

router.get("/", verifyToken, usersController.getAllUsers);

router.put("/:id", usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

router.post("/login", usersController.loginUser);

router.post("/registre", usersController.createUser);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
router.get("/:id", usersController.getUserById);

module.exports = router;
