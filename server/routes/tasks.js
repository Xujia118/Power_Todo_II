const express = require("express");
const router = express.Router();
const Task = require("../schemas/Task");

router.get("/", async (req, res) => {
  res.json({ text: "Great!" });
});

module.exports = router;
