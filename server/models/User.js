const mongoose = require("mongoose");
const { Schema } = mongoose;
const Task = require("./Task");

const userSchema = ({
    username: {
        type: String,
        required: true
    },
    tasks: {
        type: map,
        of: Task.schema,
        default: {}
    },
})