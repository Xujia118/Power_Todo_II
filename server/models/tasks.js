const mongoose = require("mongoose");
const uuid = require("uuid").v4;

const User = require("../schemas/User");
const Task = require("../schemas/Task");

// Get all tasks of a user
async function getTasks(username) {
  try {
    const userData = await User.findOne({ username });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

async function getTask({ username, taskId }) {
  try {
    const userData = await User.findOne({ username });
    const task = userData.tasks[taskId];
    console.log("In getTask:", task)
    return task;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// // add task
// async function addTask(username, newTask) {
//   const taskId = uuid();
//   try {
//     const taskData = {
//       id: taskId,
//       ...newTask
//     }
//     // const createdTask = await Task.create(taskData);
//     const addResult = await User.updateOne(
//       { username },
//       { $set: { [`tasks.${taskId}`]: createdTask } }
//     );
//     return addResult.acknowledged ? true : false;
//   } catch (err) {
//     throw new Error("Failed to add task");
//   }
// }

// async function addTask(username, newTask) {
//   try {
//     // Create a new task instance
//     const taskData = new Task(newTask);

//     // Find the user and embed the new task
//     const updatedUser = await User.updateOne(
//       { username },
//       { $set: { [`tasks.${taskData._id}`]: taskData } },
//     );

//     // Return the updated user document
//     return updatedUser;
//   } catch (err) {
//     throw new Error("Failed to add task");
//   }
// }


async function addTask(username, newTask) {
  try {
    // Create a new task instance
    const taskData = new Task(newTask);

    // Find the user and embed the new task
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { [`tasks.${taskData._id}`]: taskData } },
      { new: true }
    );

    // Return the updated user document
    return updatedUser;
  } catch (err) {
    throw new Error('Failed to add task');
  }
}

const username = 'xujia';
const testTask = {
  name: 'Test Task',
  notes: ['This is a test note'],
  deadline: new Date('2023-06-30'),
};

addTask(username, testTask)
  .then((updatedUser) => {
    console.log('Updated User:', updatedUser);
  })
  .catch((err) => {
    console.error('Error:', err);
  });





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
    return updateResult.acknowledged ? true : false;
  } catch (err) {
    throw new Error("Failed to update task");
  }
}

async function getNotes({ username, taskId }) {
  try {
    const task = await getTask({ username, taskId });
    const notes = task ? task.notes : null;
    return notes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// const taskId = "d0d8a380-c9db-4674-a49e-1c7315c3e29e";

// // console.log(getNotes({username, taskId}));

// getNotes({ username, taskId })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

async function addNote({ username, taskId, newNote }) {
  try {
    const task = await getTask({ username, taskId });
    const notes = task ? task.notes : null;

    // notes is a map object

    const noteId = uuid();
    const addResult = await User.updateMany(
      { username },
      { $set: { [`tasks.${taskId} `]: { notes: newNote } } } // wrong here
    );
    return addResult.acknowledged ? true : false;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to add task");
  }
}

const newNote = "note 3"
// addNote({username, taskId, newNote})


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
