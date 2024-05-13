const express = require("express");
const router = express.Router();

// Import files
const notes = require("../models/notes");
const authenticate = require("./auth");

// Get recent notes
router.get(`/:taskId/notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;

  try {
    const recentNotes = await notes.getRecentNotes(taskId);

    return res.json({ recentNotes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get additional notes
router.get(`/:taskId/additional-notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;

  try {
    const additionalNotes = await notes.getAdditionalNotes(taskId);
    return res.json({ additionalNotes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add a note
router.post(`/:taskId/notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;
  const { newNote } = req.body;

  try {
    const addResult = await notes.addNote(taskId, newNote);

    if (addResult === "added to recent notes") {
      return res.json({ message: "added to recent notes" });
    }

    if (addResult === "added to additional notes") {
      return res.json({ message: "added to additional notes" });
    }

    return res.status(404).json({ message: "Add failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a note
router.delete(`/:taskId/notes`, async (req, res) => {
  const userId = authenticate(req, res);
  if (!userId) {
    return;
  }

  const { taskId } = req.params;
  const { noteId } = req.body;

  try {
    const deleteResult = await notes.deleteNote(taskId, noteId);

    if (deleteResult === "deleted from recent notes") {
      return res.json({ message: "deleted from recent notes" });
    }

    if (deleteResult === "deleted from additional notes") {
      return res.json({ message: "deleted from additional notes" });
    }

    return res.status(404).json({ message: "Delete failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update a note
router.patch(`/:taskId/notes`, async (req, res) => {
  const username = authenticate(req, res);
  if (!username) {
    return;
  }

  const { taskId } = req.params;
  const { noteId, updatedNote } = req.body;

  try {
    const updateResult = notes.addNote({
      username,
      taskId,
      noteId,
      updatedNote,
    });
    if (updateResult) {
      return res.json({ message: "Update successful" });
    }
    return res.status(404).json({ message: "Update failed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
