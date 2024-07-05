const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/", adminMiddleware, userController.getAllUsers);

router.get("/me", authMiddleware, userController.getCurrentUser);

router.get("/:id", userController.getUser);

router.post("/", userController.createUser);

router.put("/ban/:userId", userController.banUser);

router.get("/verify/:userId", adminMiddleware, userController.verifyUser);

router.put("/:id", authMiddleware, userController.updateUser);

router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
