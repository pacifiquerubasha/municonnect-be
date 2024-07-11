const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/:datasetId", authMiddleware, messagesController.getMessages);
router.post("/", authMiddleware, messagesController.sendMessage);
router.post("/sample-questions/", authMiddleware, messagesController.getSampleQuestions);

module.exports = router;
