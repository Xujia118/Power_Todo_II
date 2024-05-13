const express = require("express");
const router = express.Router();

// Import files
const tasks = require("../models/tasks");
const authenticate = require("./auth");

// Get all tasks of a user
router.get("/", async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  try {
    const allTasks = await tasks.getTasks(userId);
    res.status(200).json({ allTasks });
  } catch (err) {
    res.status(404).json({ message: "tasks not found" });
  }
});

// Add one task
router.post("/add", async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { newTask } = req.body;

  try {
    const addResult = await tasks.addTask(userId, newTask);
    if (addResult) {
      return res.status(201).json({ message: "add-task-successful" });
    }
    res.status(400).json({ message: "add-task-failed" });
  } catch (err) {
    console.log(err);
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;

  try {
    const deleteResult = tasks.deleteTask(userId, taskId);
    if (deleteResult) {
      res.status(200).json({ message: "Delete successful" });
      return;
    }
    res.status(404).json({ message: "Task not found" });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete task");
  }
});

// Update a task name
// We will update notes separately
// We could update other things, such as deadline, priority, etc. To see
// Also, need to finish this function later
router.patch("/:taskId", async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;
  const { newName } = req.body;

  try {
    const updateResult = tasks.updateTask(userId, taskId, newName);
    if (updateResult) {
      return res.status(200).json({ message: "Update successful" });
    }
    res.status(404).json({ message: "Task not found" });
  } catch (err) {
    throw new Error("Failed to update task");
  }
});

module.exports = router;
