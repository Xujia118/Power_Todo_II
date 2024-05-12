const { ObjectId } = require("mongoose").Types;

const { User, Task, Note } = require("../schema");

// Tasks
async function getTasks(userId) {
  try {
    const userData = await User.findOne({ _id: userId });
    return userData.tasks;
  } catch (err) {
    console.log(err);
  }
}

async function getOneTask({ userId, taskId }) {
  try {
    const userData = await User.findOne({ _id: userId });
    const task = userData.tasks[taskId];
    return task;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// add task
async function addTask(userId, newTask) {
  try {
    const addTask = {
      userId,
      ...newTask,
    };

    const task = await Task.create(addTask);

    // update user
    const updateResult = await User.updateOne(
      { _id: userId },
      { $push: { tasks: task._id } }
    );
    
    return !!updateResult.modifiedCount;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// delete task
async function deleteTask(userId, taskId) {
  try {
    const deleteResult = await User.updateOne(
      { userId },
      { $unset: { [`tasks.${taskId}`]: "" } }
    );

    console.log("deleted:", deleteResult);

    return deleteResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to delete task");
  }
}

// update task. Only update task name, leave notes name to notes apis
async function updateTask({ userId, taskId, newName }) {
  try {
    const updateResult = await User.updateOne(
      { userId, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.name`]: newName } }
    );
    return updateResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to update task");
  }
}

// Notes
async function getNotes({ userId, taskId }) {
  try {
    const task = await getOneTask({ userId, taskId });
    const notes = task ? task.notes : null;
    return notes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//
async function addNote({ username, taskId, newNote }) {
  try {
    const noteId = new ObjectId();
    const addResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      {
        $set: {
          [`tasks.${taskId}.notes.${noteId}`]: {
            _id: noteId,
            text: newNote,
            done: false,
          },
        },
      }
    );
    return addResult.modifiedCount > 0;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add task");
  }
}

// 参考以下代码
// Assume you have a function to add a note to a task
async function addNoteToTask(taskId, noteData) {
  // Find the task by ID
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // Check if the task already has 10 embedded notes
  if (task.notes.length >= 10) {
    // If it has 10 or more notes, add the new note as a reference
    const newNote = await Note.create(noteData);
    task.additionalNotes.push(newNote._id); // Add the reference to additionalNotes array
  } else {
    // If it has less than 10 notes, add the new note directly to the embedded notes array
    task.notes.push(noteData);
  }

  // Save the updated task document
  await task.save();
}

async function deleteNote({ username, taskId, noteId }) {
  try {
    const user = await User.findOne({ username });

    if (
      !user ||
      !user.tasks[taskId] ||
      !user.tasks[taskId].notes ||
      !user.tasks[taskId].notes[noteId]
    ) {
      return false;
    }

    const deleteResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $unset: { [`tasks.${taskId}.notes.${noteId}`]: "" } }
    );

    return deleteResult.modifiedCount > 0;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete task");
  }
}

async function updateNote({ username, taskId, noteId, updatedNote }) {
  try {
    const user = await User.findOne({ username });

    if (
      !user ||
      !user.tasks[taskId] ||
      !user.tasks[taskId].notes ||
      !user.tasks[taskId].notes[noteId]
    ) {
      return false;
    }

    const updateResult = await User.updateOne(
      { username, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.notes.${noteId}.text`]: updatedNote } }
    );

    return updateResult.modifiedCount > 0;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add task");
  }
}

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
