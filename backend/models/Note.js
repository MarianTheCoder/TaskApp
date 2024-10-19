const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    lastModified: {
        type:Date,
        default: new Date()
    },
    text:{
        type:String,
        default:""
    },
    color:{
        type:String,
        required:true
    }
});

const noteModel = mongoose.model("notes",noteSchema);

module.exports = {noteModel , noteSchema}