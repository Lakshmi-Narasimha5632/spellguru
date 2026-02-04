const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  stage: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },

  level: {
    type: Number,
    required: true
  },

  letterIndex: {
    type: Number,
    default: 0
  },

  stars: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model(
  "Progress",
  progressSchema
);
