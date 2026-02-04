const Word = require("../models/Word");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

exports.getWord = async (req, res) => {
  try {
    const { stage, level, index } = req.query;

    const letter = alphabet[Number(index)];

    const doc = await Word.findOne({
      letter,
      difficulty: stage
    });

    // fallback
    if (!doc || !doc.words.length) {
      return res.json({
        letter,
        word: letter
      });
    }

    const words = doc.words;

    // ✅ CORRECT rotation logic
    const wordIndex =
      (Number(level) -1) %
      words.length;

    const word = words[wordIndex];

    res.json({
      letter,
      word
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Word fetch failed"
    });
  }
};
