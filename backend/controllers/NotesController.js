const users = require("../models/User");

function validateInput(input){
    const newInput = input.trim();
    if(newInput.length >= 6 && newInput.length <= 15){
        return true;
    }
    else{
        return false;
    }
}

const postNote = async (req,res) =>{
    const {name , note} = req.body;
    if(validateInput(note.title)){

        try {
            const result = await users.findOne({name});
            if(result){
                result.notes.push(note);
                await result.save();
                res.send("New note added");
            }
            else{
                res.status(400).send("User not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else{
        res.status(400).send("Title should have at least 6 characters");
    }
};

const getNotes = async (req,res) =>{
    const {name} = req.body;
    try {
        const result = await users.findOne({name});
        if(result){
            res.send(result.notes);
        }
        else{
            res.status(400).send("Name not found");   
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const getTheNote = async (req,res) =>{
    const {name , noteID} = req.body;
    try {
        const result = await users.findOne({name});
        if(result){
            const note = result.notes.findIndex(item => item._id.toString() === noteID);
            if(note != -1)
                res.send(result.notes[note]);
            else{
                res.status(400).send("Note not found");
            }
        }
        else{
            res.status(400).send("Name not found");   
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateNote = async (req,res) =>{
    let {name , title , text , noteID} = req.body;
    if(!validateInput(title)){
        title = "Too short"
    }
    try {
        const result  = await users.findOne({name});
        if(result){
             const index = result.notes.findIndex(item => item._id.toString() === noteID);
             if(index != -1){
                if(result.notes[index].title !== title || result.notes[index].text !== text){
                    result.notes[index].title = title;
                    result.notes[index].text = text;
                    result.notes[index].lastModified = new Date();
                    await result.save();
                    res.send("Note saved");
                }
                else{
                    res.send("Nothing to save");
                }

             }
             else{
                res.status(400).send("Note not found"); 
             }
        }
        else{
            res.status(400).send("User not found"); 
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteNote = async (req , res) =>{
    const {name , noteID} = req.body;
    try {
        const result = await users.findOne({name});
        if(result){
            const index =  result.notes.findIndex(task => task._id.toString() === noteID);
            if(index != -1){
                result.notes.splice(index,1);
                await result.save();
                res.send("Note was deleted");
            }
            else{
                res.status(400).send("Note was not found");
            }
        }
        else{
            res.status(400).send("User was not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
} 

module.exports = {postNote , getNotes , getTheNote , updateNote , deleteNote};