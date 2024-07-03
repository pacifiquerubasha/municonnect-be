const axios = require("axios");
const Dataset = require("../models/Dataset");

exports.createDataset = async (req, res) => {
  const {
    title,
    numRows,
    numColumns,
    fileSize,
    fields,
    description,
    tags,
    domain,
    language,
    isPrivate,
    licence,
    releaseDate,
    mainFile,
  } = req.body;

  const owner = req.user.authId;

  try {
    const dataset = new Dataset({
      name: title,
      owner,
      description,
      tags: tags.split(","),
      language,
      fields,
      numRows,
      numColumns,
      fileSize,
      isPrivate,
      domain,
      licence,
      releaseDate,
      files: {
        mainFile,
        otherFiles: [],
      },
    });

    await dataset.save();
    res.status(201).json(dataset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyDatasets = async (req, res) => {
  try {
    const owner = req.user.authId;

    const datasets = await Dataset.find({ owner });
    res.status(200).json(datasets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all datasets
exports.getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find();
    res.status(200).json(datasets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific dataset by ID
exports.getDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }
    res.status(200).json(dataset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a specific dataset by ID
exports.updateDataset = async (req, res) => {
  try {
    const updatedDataset = await Dataset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }
    res.status(200).json(updatedDataset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateFileSummary = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    const fileName = dataset.files.mainFile.split("/").pop();
    const response = await axios.post(
      "http://localhost:8080/process_summary/",
      {
        file_name: fileName,
        domain: dataset.domain,
      }
    );

    if (response.data) {
      dataset.summary = response.data.summary;
      await dataset.save();
      res.status(200).json({
        message: "Summary generated successfully",
        summary: response.data.summary,
      });
    }

    return res.status(400).json({ message: "Failed to generate summary" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


