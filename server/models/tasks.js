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
    const updateResult = await User.updateOne(
      { username },
      { $set: { [`tasks.${taskId}`]: {id:taskId, newTask} } }
    );

    return updateResult.modifiedCount ? true : false;
  } catch (err) {
    throw new Error("Failed to add task");
  }
}

// const testUser = 'xujia'
// const testTask = {
//   name: 'test task in server code',
// }

// addTask(testUser, testTask)

// delete task
async function deleteTask(username, taskId) {
  try {
    const deleteResult = await User.updateOne(
      { username },
      { $unset: { [`tasks.${taskId}`]: "" } }
    );

    return deleteResult.modifiedCount ? true : false;
  } catch (err) {
    throw new Error("Failed to delete task");
  }
}

const taskId = "6636b6fe9d63f6bed4efee54";
// deleteTask(testUser, taskId)



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
