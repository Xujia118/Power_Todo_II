const express = require("express");
const router = express.Router();

// Import files
const Task = require("../schemas/Task");
const User = require("../schemas/User");
const users = require("../models/users");
const authenticate = require("./auth");

// Get all tasks
router.get("/", async (req, res) => {
  const username = authenticate(req, res);

  try {
    const userData = users.getUserData(username);
    const tasks = userData.tasks;
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(404).json({ error: "tasks not found" });
  }
});

// Get one task

// Create a task

// Delete a task

// Update a task, at least update task name

module.exports = router;
