const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/:datasetId", authMiddleware, messagesController.getMessages);
router.post("/", authMiddleware, messagesController.sendMessage);

module.exports = router;
