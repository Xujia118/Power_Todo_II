const uuid = require("uuid").v4;
const User = require("../schemas/User");

// get tasks
async function getUserTasks(username) {
  try {
    const userData = await User.findOne({ username });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

// add task
async function addTask(username) {
  try {
    const taskId = uuid();
    const taskName = "testTask1";
    const taskDate = new Date();
    const taskNotes = {};

    const newTask = {
      name: taskName,
      notes: taskNotes,
      date: taskDate,
    };

    await User.updateOne(
      { username },
      { $set: { [`tasks.${taskId}`]: newTask } }
    );

    return newTask;
  } catch (err) {
    console.log(err);
  }
}

// delete task
async function deleteTask(username, taskId) {
  try {
    await User.updateOne({ username }, { $unset: { [`tasks.${taskId}`]: "" } });
  } catch (err) {
    console.log(err);
  }
}

// update task. Only update task name, leave notes name to notes apis
async function updateTask(username, taskId, newName) {
  try {
    await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.name`]: newName } }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUserTasks,
  addTask,
  deleteTask,
  updateTask,
};
