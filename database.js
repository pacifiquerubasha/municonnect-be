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



module.exports = mongoose.model("Message", messageSchema);
