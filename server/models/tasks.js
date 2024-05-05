const User = require("../schemas/User");
const uuid = require("uuid").v4;

// Get all tasks of a user
async function getUserTasks(username) {
  try {
    const userData = await User.findOne({ username });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

// add task
async function addTask(username, newTask) {
  try {    
    const taskId = uuid();
    const addResult = await User.updateOne(
      { username },
      { $set: { [`tasks.${taskId}`]: {id:taskId, ...newTask} } }
    );
    return addResult.acknowledged ? true : false;
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

    return deleteResult.acknowledged ? true : false;
  } catch (err) {
    throw new Error("Failed to delete task");
  }
}

// update task. Only update task name, leave notes name to notes apis
async function updateTask(username, taskId, newName) {
  try {
    const updateResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.name`]: newName } }
    );

    return updateResult.modifiedCount ? true : false;
  } catch (err) {
    throw new Error("Failed to update task");
  }
}

module.exports = {
  getUserTasks,
  addTask,
  deleteTask,
  updateTask,
};
