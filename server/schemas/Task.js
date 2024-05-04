const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: Map,
    default: {}  
  },
  date: {
    type: Date,
    require: true,
    default: Date.now
  },  
  deadline: {
    type: Date,
  },
  done: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);