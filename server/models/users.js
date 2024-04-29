const User = require("../schemas/User");
const uuid = require("uuid").v4;

async function userExists(username) {
  const existingUser = await User.findOne({ username });
  return existingUser;
}

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

async function getUserData(username) {
  const userData = await User.findOne({ username });
  return userData;
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

// update task
async function updateTask(username) {
  try {
  } catch (err) {
    console.log(err);
  }
}

async function test() {
  await addTask("xujia");
  const testUserData = await getUserData("xujia");
  console.log("2", testUserData);
}
// test();

module.exports = {
  isValid,
  userExists,
  addTask,
  deleteTask,
};
