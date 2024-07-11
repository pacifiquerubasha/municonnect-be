const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/datasetController");
const upload = require("../middlewares/fileUpload");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, datasetController.createDataset);
router.put("/:id", authMiddleware, datasetController.updateDataset);
router.get("/", adminMiddleware, datasetController.getAllDatasets);
router.get("/my-datasets", authMiddleware, datasetController.getMyDatasets);

router.get(
  "/:id/summary",
  authMiddleware,
  datasetController.generateFileSummary
);
router.put(
  "/:datasetId/switch-private",
  authMiddleware,
  datasetController.switchIsPrivate
);
router.put(
  "/:datasetId/switch-approved",
  adminMiddleware,
  datasetController.switchIsApproved
);
router.get("/public", datasetController.getPublicDatasets);

router.get("/get-dataset-stats", datasetController.getCategoryStats);
router.get("/:id", datasetController.getDataset);
router.put("/:id/increase-downloads", datasetController.increaseDownloads);
router.put("/:id/add-rating", datasetController.addRating);

module.exports = router;
