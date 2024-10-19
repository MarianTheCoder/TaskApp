const {taskSchema } = require("./Tasks");
const {focusSes } = require("./Focus");
const { noteSchema } = require("./Note");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    taskList: [taskSchema],
    sessions: [focusSes],
    notes: [noteSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
