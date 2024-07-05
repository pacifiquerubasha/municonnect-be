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

exports.getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({isPrivate:false});
    res.status(200).json(datasets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.switchIsPrivate = async (req, res) => {
  const { datasetId } = req.params;

  try {
    const dataset = await Dataset.findById(datasetId);

    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    dataset.isPrivate = !dataset.isPrivate;

    await dataset.save();

    res.status(200).json({
      message: "Dataset privacy status updated successfully",
      dataset,
    });
  } catch (error) {
    console.error("Error switching dataset privacy status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.switchIsApproved = async (req, res) => {
  const { datasetId } = req.params;

  try {
    const dataset = await Dataset.findById(datasetId);

    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    if (dataset.isApproved) {
      dataset.reasonForRemoval = req.body.reasonForRemoval;
    } else {
      dataset.reasonForRemoval = "";
    }
    dataset.isApproved = !dataset.isApproved;

    await dataset.save();

    res.status(200).json({
      message: "Dataset approval status updated successfully",
      dataset,
    });
  } catch (error) {
    console.error("Error switching dataset approval status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPublicDatasets = async (req, res) => {
  try {
    const publicDatasets = await Dataset.find({
      isPrivate: false,
      isApproved: true,
    });

    res.status(200).json({
      message: "Public datasets retrieved successfully",
      datasets: publicDatasets,
    });
  } catch (error) {
    console.error("Error retrieving public datasets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
