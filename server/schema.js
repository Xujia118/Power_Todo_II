const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const taskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  recentNotes: { type: [noteSchema], default: [] }, // Embed up to 10 notes
  additionalNotes: [{ type: Schema.Types.ObjectId, ref: "Note" }], // Reference additional notes
  deadline: { type: Date },
  done: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Task: mongoose.model("Task", taskSchema),
  Note: mongoose.model("Note", noteSchema),
};