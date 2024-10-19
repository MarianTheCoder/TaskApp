const users = require("../models/User");



function isValidString(input) {
    // Trim the input to remove leading and trailing spaces
    const trimmedInput = input.trim();
  
    // Check if the trimmed string is at least 6 characters long
    return trimmedInput.length >= 6 && trimmedInput.length <= 20 ;
  }

const newSession = async (req,res) =>{
    const {name , object} = req.body;
    if(isValidString(object.focusName)){

        try{
            const result = await users.findOne({name});
            if(result){
                result.sessions.push(object);
                await result.save();
                res.send("All good , new session introduced");
            }
            else{
                res.status(400).send("User not found");
            }
        }
        catch(err){ 
            console.log(err);
            res.status(400).send(err);
        }
    }
    else{
        res.status(400).send("Name too short");
    }
}

const getSessions = async (req,res) =>{
    const {name} = req.body;
    try{
        const result = await users.findOne({name});
        if(result){
            res.send(result.sessions);
        }
        else{
            res.status(400).send("User was not found in sessions tab");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

const putSesTime = async (req,res) =>{
    const {name , sessionID, time} = req.body;
    try{
        const result = await users.findOne({name});
        if(result){
            const theSes = result.sessions.findIndex(ses => ses._id.toString() == sessionID)
            result.sessions[theSes].time.push(time);
            await result.save();
            res.send("all good");
        }
        else{
            res.status(400).send("User not found"); 
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

const deleteSessionTime = async(req,res) =>{
    const {name , sessionID , sessionTimeID} = req.body;
    try {
        const result = await users.findOne({name});
        if(result){
            const session = result.sessions.findIndex(ses => ses._id.toString() === sessionID);
            if(session != -1){
                const theindex = result.sessions[session].time.findIndex(time => time._id.toString() === sessionTimeID);
                if(theindex != -1){
                    result.sessions[session].time.splice(theindex , 1);
                    await result.save();
                    res.send("Time was deleted succesfully");
                }

            }
        }
        else{
            res.status(400).send("User not found"); 
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteSession = async (req,res)=>{
    const {name , sessionID} = req.body;
    try {
        const result = await users.findOne({name})
        if(result){
            const index = result.sessions.findIndex(ses => ses._id.toString() === sessionID);
            if(index != -1){
                result.sessions.splice(index , 1);
                await result.save();
                res.send("Session deleted succesfully");
            }
            else{
                res.status(400).send("Session not found");
            }
        }
        else{
            res.status(400).send("User not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {newSession , getSessions , putSesTime , deleteSessionTime  , deleteSession};