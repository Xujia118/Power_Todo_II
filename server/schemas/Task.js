const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const taskSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  notes: {noteSchema},
  date: { type: Date, default: Date.now },
  deadline: { type: Date },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
