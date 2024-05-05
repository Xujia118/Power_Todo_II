const mongoose = require("mongoose");
const uuid = require("uuid").v4;

const User = require("../schemas/User");
const Task = require("../schemas/Task");

// Tasks
async function getTasks(username) {
  try {
    const userData = await User.findOne({ username });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

async function getOneTask({ username, taskId }) {
  try {
    const userData = await User.findOne({ username });
    const task = userData.tasks[taskId];
    return task;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// add task
async function addTask(username, newTask) {
  const taskData = {
    ...newTask,
  };
  try {
    const createdTask = new Task(taskData);
    const addResult = await User.updateOne(
      { username },
      { $set: { [`tasks.${createdTask._id}`]: createdTask } }
    );
    return addResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to add task");
  }
}

// delete task
async function deleteTask(username, taskId) {
  try {
    const deleteResult = await User.updateOne(
      { username },
      { $unset: { [`tasks.${taskId}`]: "" } }
    );

    console.log("deleted:", deleteResult);

    return deleteResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to delete task");
  }
}

// update task. Only update task name, leave notes name to notes apis
async function updateTask({ username, taskId, newName }) {
  try {
    const updateResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.name`]: newName } }
    );
    return updateResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to update task");
  }
}

// Notes
async function getNotes({ username, taskId }) {
  try {
    const task = await getOneTask({ username, taskId });
    const notes = task ? task.notes : null;
    return notes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addNote({ username, taskId, newNote }) {
  try {
    const addResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $push: { [`tasks.${taskId}.notes`]: newNote } }
    );

    console.log(addResult)

    return addResult.modifiedCount > 0;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add task");
  }
}

const testUser = "xujia"
const testTaskId = "66372144d443cd794dd284e8"
const newNote = "note3"


async function deleteNote({ username, taskId, noteId }) {}

async function updateNote({ username, taskId, noteId, updatedNote }) {}

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getNotes,
  addNote,
  deleteNote,
  updateNote,
};
