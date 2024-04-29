const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Note", noteSchema);