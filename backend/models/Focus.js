const mongoose = require("mongoose");

const focusSes = new mongoose.Schema({
    focusName:{
        type:String,
        required: true
    },
    time:[
        {
            hours:{
                type:Number,
                default:0
            },
            minutes:{
                type:Number,
                default:0
            },
            seconds:{
                type:Number,
                default:0
            }
        }
    ]

});

const focusModel = mongoose.model("Focus" , focusSes);

module.exports = {focusSes , focusModel}