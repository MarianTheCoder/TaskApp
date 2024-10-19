const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
       
    },
    priority:{
        type: String,
        enum:["low","medium","high"],
    },
    minutes:{
        type:Number,
        default:0
    },
    hours:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
    },
    minutesIn:{
        type:Number,
        default:0
    },
    hoursIn:{
        type:Number,
        default:0
    }
});

const taskModel =  mongoose.model("Task" , taskSchema);

module.exports = {taskSchema, taskModel};