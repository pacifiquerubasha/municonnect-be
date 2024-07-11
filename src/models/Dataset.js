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
      desc: { type: String },
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
  ratings: { type: [Number] },
  language: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: true },
  reasonForRemoval: { type: String },
  summary: { type: String },
  downloads: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sampleQuestions: [String],
});

datasetSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / this.ratings.length;
});

datasetSchema.set("toJSON", { virtuals: true });
datasetSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Dataset", datasetSchema);
