const Progress = require("../models/Progress");

/* ===============================
   PROFILE DASHBOARD DATA
================================ */
exports.getProfileProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id
    });

    const response = {
      easy: null,
      medium: null,
      hard: null,
      totalStars: 0,
      levelsPlayed: 0
    };

    progress.forEach((p) => {
      response.totalStars += p.stars;

      if (p.letterIndex === 26) {
        response.levelsPlayed += 1;
      }

      if (!response[p.stage]) {
        response[p.stage] = {
          currentLevel: 1,
          letterIndex: 0,
          stars: 0
        };
      }

      if (p.letterIndex === 26) {
        response[p.stage].currentLevel = Math.max(
          response[p.stage].currentLevel,
          p.level + 1
        );
      } else {
        response[p.stage].currentLevel = Math.max(
          response[p.stage].currentLevel,
          p.level
        );
      }

      response[p.stage].letterIndex =
        p.letterIndex;

      response[p.stage].stars += p.stars;
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Profile error" });
  }
};

/* ===============================
   GET LEVEL PROGRESS
================================ */
exports.getProgress = async (req, res) => {
  try {
    const { stage, level } = req.query;

    if (!stage || !level) {
      return res.json({
        letterIndex: 0,
        stars: 0
      });
    }

    const progress = await Progress.findOne({
      user: req.user._id,
      stage,
      level: Number(level)
    });

    res.json(
      progress || {
        letterIndex: 0,
        stars: 0
      }
    );
  } catch (err) {
    console.error("getProgress error:", err);
    res.status(500).json({ message: "Progress error" });
  }
};

/* ===============================
   UPDATE LEVEL PROGRESS
================================ */
exports.updateProgress = async (req, res) => {
  const { stage, level, letterIndex, stars } =
    req.body;

  let progress = await Progress.findOne({
    user: req.user._id,
    stage,
    level
  });

  if (!progress) {
    progress = new Progress({
      user: req.user._id,
      stage,
      level
    });
  }

  progress.letterIndex = Math.max(
    progress.letterIndex,
    letterIndex
  );

  // ⭐ store best stars only
  progress.stars = Math.max(
    progress.stars,
    stars
  );

  await progress.save();

  res.json(progress);
};

/* ===============================
   GET ALL COMPLETED LEVELS
================================ */
exports.getAllProgress = async (req, res) => {
  const { stage } = req.query;

  const data = await Progress.find({
    user: req.user._id,
    stage,
    letterIndex: 26
  });

  res.json(data);
};
