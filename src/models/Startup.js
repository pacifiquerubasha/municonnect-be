const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  founder: { type: String, required: true },
  website: { type: String },
  contactEmail: { type: String, required: true },
  establishedDate: { type: Date, required: true },
  location: { type: String, required: true },
  marketValue: { type: Number, required: true },
  stage: {
    type: String,
    enum: ["ideation", "validation", "growth", "established"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
