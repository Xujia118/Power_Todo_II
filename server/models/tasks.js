const uuid = require("uuid").v4;
const User = require("../schemas/User");

// Get all tasks of a user
async function getUserTasks(username) {
  try {
    const userData = await User.findOne({ username });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

// Get one task of a user

// add task
async function addTask(username, newTask) {
  try {
    const taskId = uuid();
    await User.updateOne(
      { username },
      { $set: { [`tasks.${taskId}`]: newTask } }
    );

    return newTask;
  } catch (err) {
    console.log(err);
  }
}

const testTask = { name: "test post task", deadline: "2024-05-04" };

const testUser = "xujia";
addTask(testUser, testTask);

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
