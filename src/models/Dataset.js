const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  lastModified: { type: Date, default: Date.now },
  licence: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  fields: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      desc: { type: String},
    },
  ],
  files: {
    mainFile: { type: String, required: true },
    otherFiles: [String],
  },
  numRows: { type: Number, required: true },
  numColumns: { type: Number, required: true },
  fileSize: { type: Number, required: true },  
  associatedArticles: [String],
  domain: { type: String, required: true },
  rating: { type: Number, default: 0 },
  language: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: true },
  reasonForRemoval: { type: String },
  summary: { type: String },
  sampleQuestions: [String],
});

module.exports = mongoose.model("Dataset", datasetSchema);
