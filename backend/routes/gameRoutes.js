const express = require("express");
const router = express.Router();

const {
  getWord
} = require("../controllers/gameController");

router.get("/word", getWord);

module.exports = router;
