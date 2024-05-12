const express = require("express");
const router = express.Router();

// Import files
const Task = require("../schema");
const User = require("../schema");
const users = require("../models/users");
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

// Get all notes
router.get(`/:taskId/notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;

  try {
    const allNotes = await tasks.getNotes({ userId, taskId });
    return res.json({ allNotes: allNotes || {} });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add a note
router.post(`/:taskId/notes`, async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }

  const { taskId } = req.params;
  const { newNote } = req.body;

  try {
    const addResult = tasks.addNote({ username, taskId, newNote });
    if (addResult) {
      return res.json({ message: "Add successful" });
    }
    return res.status(404).json({ message: "Add failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a note
router.delete(`/:taskId/notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;
  const { noteId } = req.body;

  try {
    const deleteResult = tasks.deleteNote({ userId, taskId, noteId });
    if (deleteResult) {
      return res.json({ message: "Delete successful" });
    }
    return res.status(404).json({ message: "Delete failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update a note
router.patch(`/:taskId/notes`, async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }

  const { taskId } = req.params;
  const { noteId, updatedNote } = req.body;

  try {
    const updateResult = tasks.addNote({
      username,
      taskId,
      noteId,
      updatedNote,
    });
    if (updateResult) {
      return res.json({ message: "Update successful" });
    }
    return res.status(404).json({ message: "Update failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
