const Word = require("../models/Word");

exports.getWord = async (req, res) => {
  try {
    const level = (req.query.level || "easy").toLowerCase();

    const words = await Word.find({ difficulty: level });

    console.log("Level:", level);
    console.log("Words found:", words.length);

    if (words.length === 0) {
      return res.status(404).json({
        message: "No words found"
      });
    }

    const randomIndex = Math.floor(
      Math.random() * words.length
    );

    res.json(words[randomIndex]);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
