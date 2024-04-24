const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
    res.json({ text: "Great!"})
})

module.exports = router;