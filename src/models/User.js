const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["individual", "institution", "admin"],
    required: true,
    default: "individual",
  },
  bio: { type: String },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  isBanned: {
    status: { type: Boolean, default: false },
    reason: { type: String },
  },
  apiKey: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("User", userSchema);
