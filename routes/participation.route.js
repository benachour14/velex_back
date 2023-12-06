const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const participationsController = require("../services/participation.services");
const router = express.Router();

router.post("/", verifyToken, participationsController.createParticipation);
router.get("/", verifyToken, participationsController.getAllParticipations);
router.get("/:userId/:eventId", verifyToken, participationsController.getParticipation);
router.put("/:userId/:eventId", verifyToken, participationsController.updateParticipation);
router.delete("/:userId/:eventId", verifyToken, participationsController.deleteParticipation);

module.exports = router;