const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/datasetController");
const { authenticateApiKey } = require("../middlewares/authMiddleware");

router.get(
  "/get-municonnect-datasets",
  authenticateApiKey,
  datasetController.getPublicDatasets
);

router.get(
  "/get-municonnect-datasets-stats",
  authenticateApiKey,
  datasetController.getCategoryStats
);

module.exports = router;
