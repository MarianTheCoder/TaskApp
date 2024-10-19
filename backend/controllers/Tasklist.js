const userTasks = require("../models/User");


const taskReciever = async (req,res) =>{
    
    const {name , task} = req.body;
    if(task.title != ''){

        try{
            const user = await userTasks.findOne({name});
            if(user){
                
                user.taskList.push(task);
                await user.save();
                res.send("all good , new task saved");
            }
            else{
                console.log("Could not save data");
            }
        }
        catch(err){
            console.log('Task not added to user:', err);
        }
    }
    else{
        res.send("Title should not be empty");
    }
} 

const taskExport = async (req,res) =>{
    console.log("here is get task")
    const {name} = req.body
    try{
        const result = await userTasks.findOne({name});
        if(result){
            res.json(result.taskList);
        }
        else{
            console.log("Didn't find this name");
        }
    }
    catch(err){
        console.log(err);
    }
}

const taskDelete = async(req,res) =>{
    const {name , id} = req.body;
    console.log("this is:" , id);
    try{
        const result = await userTasks.findOne({name});
        if(result){    
            const taskIndex = result.taskList.findIndex(task => 
            task._id.toString() === id);
            if (taskIndex === -1) {
                console.log('Task not found');
                res.send("Task not found");
              }
              else{

                  // Remove the task from the array
                  result.taskList.splice(taskIndex, 1);
                  
                  // Save the updated user document
                  await result.save();
                  res.send('Task deleted successfully');
                }
        }
        else{
            console.log("Something went wrong , no user was found");
        }

    }
    catch(err){
        console.log(err);
    }
}

const editTask = async (req,res) =>{
    const {name , id ,task} = req.body;
    try{
        const result = await userTasks.findOne({name});
        if(result){
            const taskFound = result.taskList.findIndex(task => task._id.toString() === id);
            if(taskFound !== -1){
                console.log(taskFound);
                result.taskList[taskFound] = task;
                await result.save();
                res.send("Task modified succesfully");
            }
            else{
                res.status(400).send("Task could not be found");
            }
        }
        else{
            console.log("Task not found to edit");
            res.status(400).send("Task not found to edit");
        }
    }
    catch(err){
        console.log(err);
    }
}

const putTime = async (req,res)=>{
    const {name , id , hours , minutes} = req.body;
    console.log(name , id, hours, minutes);
    try{
        const result = await userTasks.findOne({name});
        if(result){
            const taskid = result.taskList.findIndex(task => task._id.toString() === id);
            if(taskid != -1){
                if(Math.floor((result.taskList[taskid].minutesIn + minutes) / 60) > 0){
               
                    if((result.taskList[taskid].minutesIn + minutes) % 60 > 0 )
                        {
                            console.log("aici la multe ore");
                            result.taskList[taskid].hoursIn += hours + Math.floor((result.taskList[taskid].minutesIn + minutes) / 60) ;
                            result.taskList[taskid].minutesIn = (result.taskList[taskid].minutesIn + minutes) % 60;
                        }
                        else{
                            console.log("aici la mai putine ore");
                            result.taskList[taskid].hoursIn += hours + (result.taskList[taskid].minutesIn + minutes) / 60 ;
                            result.taskList[taskid].minutesIn = 0;
                        }
                    }
                else{
                    console.log("aici la final");
                    result.taskList[taskid].hoursIn += hours;
                    result.taskList[taskid].minutesIn += minutes;
                }
         
                await result.save();
                res.send("Time was put succesfully");
            }
            else{
                res.status(400).send("Task was not found");
            }
        }
        else{
            res.status(400).send("Name not found");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {taskReciever , taskExport , taskDelete , editTask , putTime};