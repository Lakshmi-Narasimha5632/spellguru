const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getProgress,
  updateProgress,
  getProfileProgress,
  getAllProgress
} = require("../controllers/progressController");

/* ✅ PROFILE PAGE */
router.get("/profile", auth, getProfileProgress);

/* ✅ GAME PAGE */
router.get("/get", auth, getProgress);

/* ✅ UPDATE */
router.post("/update", auth, updateProgress);

/* ✅ LEVELS PAGE */
router.get("/all", auth, getAllProgress);

module.exports = router;
