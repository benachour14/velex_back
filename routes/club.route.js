const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const clubsController = require("../services/club.services");
const router = express.Router();

router.post("/", verifyToken, clubsController.createClub);
router.get("/",  clubsController.getAllClubs);
router.get("/:id", verifyToken, clubsController.getClubById);
router.put("/:id", verifyToken, clubsController.updateClub);
router.delete("/:id", verifyToken, clubsController.deleteClub);

module.exports = router;