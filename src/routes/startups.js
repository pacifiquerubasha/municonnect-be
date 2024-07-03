const express = require("express");
const {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
} = require("../controllers/startupController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", adminMiddleware, createStartup);

router.get("/", getAllStartups);

router.get("/:id", getStartupById);

router.put("/:id", adminMiddleware, updateStartup);

router.delete("/:id", adminMiddleware, deleteStartup);

module.exports = router;
