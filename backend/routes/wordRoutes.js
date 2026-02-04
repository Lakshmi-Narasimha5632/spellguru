const express = require("express");
const router = express.Router();

const { getWord } = require("../controllers/wordController");

router.get("/get", getWord);

module.exports = router;
