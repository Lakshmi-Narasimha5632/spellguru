const Progress = require("../models/Progress");

/* ===============================
   PROFILE DASHBOARD DATA
================================ */
exports.getProfileProgress = async (req, res) => {
  try {

    const progress = await Progress.find({
      user: req.user._id
    });

    // Default stage values
    const response = {
      easy: { currentLevel: 1, letterIndex: 0, stars: 0 },
      medium: { currentLevel: 1, letterIndex: 0, stars: 0 },
      hard: { currentLevel: 1, letterIndex: 0, stars: 0 },
      totalStars: 0,
      levelsPlayed: 0
    };

    progress.forEach((p) => {

      // total stars
      response.totalStars += p.stars;

      // completed level count
      if (p.letterIndex >= 26) {
        response.levelsPlayed += 1;
      }

      const stageData = response[p.stage];

      if (!stageData) return;

      /* ===== current level logic ===== */

      if (p.letterIndex >= 26) {
        stageData.currentLevel = Math.max(
          stageData.currentLevel,
          p.level + 1
        );
      } else {
        stageData.currentLevel = Math.max(
          stageData.currentLevel,
          p.level
        );
      }

      /* ===== highest letter progress ===== */

      stageData.letterIndex = Math.max(
        stageData.letterIndex,
        p.letterIndex
      );

      /* ===== accumulate stars ===== */

      stageData.stars += p.stars;

    });

    res.json(response);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Profile error"
    });

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

    res.status(500).json({
      message: "Progress error"
    });

  }
};


/* ===============================
   UPDATE LEVEL PROGRESS
================================ */
exports.updateProgress = async (req, res) => {

  try {

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
        level,
        letterIndex: 0,
        stars: 0
      });
    }

    // store highest letter progress
    progress.letterIndex = Math.max(
      progress.letterIndex,
      letterIndex
    );

    // store best stars only
    progress.stars = Math.max(
      progress.stars,
      stars
    );

    await progress.save();

    res.json(progress);

  } catch (err) {

    console.error("updateProgress error:", err);

    res.status(500).json({
      message: "Update progress error"
    });

  }

};


/* ===============================
   GET ALL COMPLETED LEVELS
================================ */
exports.getAllProgress = async (req, res) => {

  try {

    const { stage } = req.query;

    const data = await Progress.find({
      user: req.user._id,
      stage,
      letterIndex: { $gte: 26 } // completed level
    });

    res.json(data);

  } catch (err) {

    console.error("getAllProgress error:", err);

    res.status(500).json({
      message: "All progress error"
    });

  }

};
