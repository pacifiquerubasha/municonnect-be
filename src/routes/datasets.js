const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/datasetController');
const upload = require('../middlewares/fileUpload');

router.post('/', datasetController.createDataset);
router.put('/:id', datasetController.updateDataset);
router.get('/', datasetController.getAllDatasets);
router.get('/:id', datasetController.getDataset);
router.get('/owner/:owner', datasetController.getMyDatasets);
router.get('/:id/summary', datasetController.generateFileSummary);

module.exports = router;
