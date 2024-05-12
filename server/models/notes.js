const { User, Task, Note } = require("../schema");

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
    const query = await Task.aggretate([
      {
        $match: { _id: taskId },
      },
      {
        $lookup: {
          from: "notes",
          localField: "additionalNotes",
          foreignField: "_id",
          as: "noteList",
        },
      },
    ]);

    return query[0].noteList;
  } catch (err) {
    console.log(err.message);
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
  if (task.recentNotes.length < 10) {
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
  getRecentNotes,
  getAdditionalNotes,
  addNote,
  deleteNote,
  updateNote,
};
