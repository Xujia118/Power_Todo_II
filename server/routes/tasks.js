const express = require("express");
const router = express.Router();

// Import files
const Task = require("../schemas/Task");
const User = require("../schemas/User");
const users = require("../models/users");
const tasks = require("../models/tasks");
const authenticate = require("./auth");

// Get all tasks
router.get("/", async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }

  try {
    const allTasks = await tasks.getUserTasks(username);
    res.status(200).json({ allTasks });
  } catch (err) {
    res.status(404).json({ message: "tasks not found" });
  }
});

// Get one task
// Might not be necessary

// Create a task
router.post("/add", async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }

  const { newTask } = req.body;

  console.log("created:", newTask)


  try {
    const updateResult = tasks.addTask(username, newTask);
    if (updateResult) {
      return res.status(201).json({ message: "Update successful" });
    }
    res.status(400).json({ message: "Update failed" });
  } catch (err) {
    console.log(err);
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }
 
  const { taskId } = req.params;
  console.log(taskId);

  try {
    const deleteResult = await User.updateOne(
      { username },
      { $unset: { [`tasks.${taskId}`]: "" } }
    );

    if (deleteResult) {
      return res.status(204).json({ message: "Delete successful" });
    }

    res.status(404).json({ message: "Task not found" });
  } catch (err) {
    throw new Error("Failed to delete task");
  }
});

// Update a task, in our case task name
// We will update notes separately
// router.patch("/:taskId", async (req, res) => {
//   const username = authenticate(req, res);
//   if (!username) {
//     return;
//   }

//   const { taskId } = req.params;

//   try {
//     const updateResult = await User.updateOne(
//       { username, [`tasks.${taskId}`]: { $exists: true } },
//       { $set: { [`tasks.${taskId}.name`]: newName } }
//     );

//     if (updateResult) {
//       return res.status(200).json({ message: "Update successful" });
//     }
//     res.status(404).json({ message: "Task not found" });
//   } catch (err) {
//     throw new Error("Failed to update task");
//   }
// });

module.exports = router;
