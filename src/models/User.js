const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true},
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
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
