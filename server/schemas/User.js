const mongoose = require("mongoose");
const { Schema } = mongoose;
const Task = require("./Task");

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
  },
  tasks: {
    type: Map,
    of: Task.schema,
    default: {},
  },
});

module.exports = mongoose.model("User", userSchema);
