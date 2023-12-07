const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const userClubsController = require("../services/userClub.services");
const router = express.Router();


router.get("/user/:userId", verifyToken, userClubsController.getUserClubs);
router.get("/club/:clubId", verifyToken, userClubsController.getClubUsers);
router.post("/", verifyToken, userClubsController.createUserClub);
router.get("/", verifyToken, userClubsController.getAllUserClubs);
router.put("/:userId/:clubId", verifyToken, userClubsController.updateUserClub);

router.delete("/:userId/:clubId", verifyToken, userClubsController.deleteUserClub);

module.exports = router;