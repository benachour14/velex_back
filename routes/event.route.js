const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const eventsController = require("../services/event.services");
const router = express.Router();

router.post("/", verifyToken, eventsController.createEvent);
router.get("/",  eventsController.getAllEvents);
router.get("/:id", verifyToken, eventsController.getEvent);
router.put("/:id", verifyToken, eventsController.updateEvent);
router.delete("/:id", verifyToken, eventsController.deleteEvent);

module.exports = router;