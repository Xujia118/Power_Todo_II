const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const taskSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  recentNotes: [noteSchema], // Embed up to 10 notes
  additionalNotes: [{ type: Schema.Types.ObjectId, ref: "Note"}], // Reference additional notes
  date: { type: Date, default: Date.now },
  deadline: { type: Date },
  done: { type: Boolean, default: false },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Task: mongoose.model("Task", taskSchema),
  Note: mongoose.model("Note", noteSchema),
};