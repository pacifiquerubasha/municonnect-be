const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/datasetController");
const upload = require("../middlewares/fileUpload");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, datasetController.createDataset);
router.put("/:id", authMiddleware, datasetController.updateDataset);
router.get("/", datasetController.getAllDatasets);
router.get("/my-datasets", authMiddleware, datasetController.getMyDatasets);
router.get("/:id", datasetController.getDataset);
router.get(
  "/:id/summary",
  authMiddleware,
  datasetController.generateFileSummary
);

module.exports = router;
