const mongoose = require("mongoose");
const { Schema } = mongoose;
const Note = require("./Notes");

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: Map,
    of: Note.schema,
    default: {}  
  },
  date: {
    type: Date,
    require: true,
    default: Date.now
  },
  done: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);