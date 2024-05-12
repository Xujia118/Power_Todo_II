const { ObjectId } = require("mongoose").Types;

const { User, Task, Note } = require("../schema");

// Tasks
async function getTasks(userId) {
  try {
    const query = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "taskList",
        },
      },
    ]);

    return query[0].taskList;
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
    // Delete task from tasks collection
    const deleteTaskResult = await Task.deleteOne({ _id: taskId });

    // Delete task from tasks array in user
    const updatedResult = await User.updateOne(
      { _id: userId },
      { $pull: { tasks: taskId } }
    );

    if (
      deleteTaskResult.deletedCount === 1 &&
      updatedResult.modifiedCount == 1
    ) {
      console.log("Task deleted successfully");
      return true;
    } else {
      console.log("Task deletion failed");
      return false;
    }
  } catch (err) {
    console.log(err.message);
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
// Get the latest ten notes embedded in tasks
async function getRecentNotes(taskId) {
  try {
    const task = await Task.findOne({ _id: taskId });
    return task.recentNotes;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

// User has to make another call to fetch distant notes
async function getAdditionalNotes(taskId) {
  try {
    const taks
  } catch(err) {
    console.log(err.message)
    throw err;
  }
}

async function addNote(taskId, newNote) {
  // Find the task by ID
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  const addNote = {
    text: newNote,
    done: false,
  };

  const note = await Note.create(addNote);

  // If task has less or equal to 10 notes, add the new note directly to the embedded notes array
  if (task.recentNotes.length <= 10) {
    task.recentNotes.push(note);
  } else {
    // If it has 10 or more notes, add the new note as a reference to tasks
    task.additionalNotes.push(note._id);
  }

  try {
    // Save the updated task document
    await task.save();
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function deleteNote({ userId, taskId, noteId }) {
  try {
    const user = await User.findOne({ userId });

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
  getRecentNotes,
  getAdditionalNotes,
  addNote,
  deleteNote,
  updateNote,
};
