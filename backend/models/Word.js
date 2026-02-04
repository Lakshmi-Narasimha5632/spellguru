const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  letter: String,
  difficulty: String,
  words: [String]
});

// 🚀 QUERY OPTIMIZATION
wordSchema.index({ letter: 1, difficulty: 1 });

module.exports = mongoose.model("Word", wordSchema);


module.exports = mongoose.model(
  "Word",
  wordSchema
);
