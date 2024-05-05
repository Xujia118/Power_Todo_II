const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
