const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userMessage: { type: String, required: true },
    botMessage: { type: String, required: true },
    datasetId: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
