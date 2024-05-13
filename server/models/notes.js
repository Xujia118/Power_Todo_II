const { User, Task, Note } = require("../schema");
const mongoose = require("mongoose");

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
    const query = await Task.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(taskId) } },
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

  try {
    // If task has less or equal to 10 notes, add the new note directly to the embedded notes array
    if (task.recentNotes.length < 10) {
      task.recentNotes.push(note);
      await task.save();
      return "added to recent notes";
    } else {
      // If it has 10 or more notes, add the new note as a reference to tasks
      task.additionalNotes.push(note._id);
      await task.save();
      return "added to additional notes";
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function deleteNote(taskId, noteId) {
  try {
    // Delete note in notes collection
    const deletedFromNotes = await Note.findByIdAndDelete(noteId);
    if (!deletedFromNotes._id) {
      throw new Error("note delete failed");
    }

    // Delete note in tasks collection
    // If note is in recentNotes
    const deletedFromRecentNotes = await Task.updateOne(
      { _id: new mongoose.Types.ObjectId(taskId) },
      { $pull: { recentNotes: { _id: new mongoose.Types.ObjectId(noteId) } } }
    );

    if (deletedFromRecentNotes.modifiedCount) {
      return "deleted from recent notes";
    }

    // If note is in additionalNotes
    const deletedFromAdditionalNotes = await Task.updateOne(
      { _id: new mongoose.Types.ObjectId(taskId) },
      {
        $pull: {
          additionalNotes: { _id: new mongoose.Types.ObjectId(noteId) },
        },
      }
    );

    if (deletedFromAdditionalNotes.modifiedCount) {
      return "deleted from additional notes";
    }
  } catch (err) {
    console.log(err.message);
    return "";
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
