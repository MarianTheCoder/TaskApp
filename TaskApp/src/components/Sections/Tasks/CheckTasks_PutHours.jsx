import React, { useContext, useEffect } from 'react'
import { taskContext } from '../../other/context/TasksContext';
import { editContext } from '../../other/context/EditContext';
import { PutTimeContext } from '../../other/context/PutTimeContext';

export default function CheckTasks(props) {

    const {taskToEdit , setTaskToEdit} = useContext(editContext);
    const {deleteTask} = useContext(taskContext);
    const {isPuttingTime , setisPuttingTime , setTaskToPutTime , taskToPutTime} = useContext(PutTimeContext);
    var color = "#FF4D4D";
    const currentDate = new Date();

    if(props.task.date == null){

      if(props.task.priority === "high"){
        color = "high_btn";
      }
      if(props.task.priority === "low"){
        color = "low_btn";
      }
      if(props.task.priority === "medium"){
        color = "medium_btn";
      }
    }
    else{
      const newDate = new Date(props.task.date)
      if(currentDate.getFullYear() < newDate.getFullYear() || 
      (currentDate.getFullYear() === newDate.getFullYear() && 
      currentDate.getMonth() < newDate.getMonth()) || 
      (currentDate.getFullYear() === newDate.getFullYear() && 
      currentDate.getMonth() === newDate.getMonth() &&
      currentDate.getDate() < newDate.getDate())){
          color = "btn-hover";
      }
      else if(currentDate.getFullYear() === newDate.getFullYear() && 
      currentDate.getMonth() === newDate.getMonth() &&
      currentDate.getDate() === newDate.getDate()){
          if (props.task.priority === "low")
            color = "low_btn";
          else if(props.task.priority === "medium")
            color = "medium_btn";
          else  color = "high_btn";
      }
      else{
          color = "gray";
  }
}
      
  


    const handlePutTime = () =>{
      if(isPuttingTime == true){
        setTaskToPutTime(null);
      }
      else{
        setTaskToPutTime(props.task._id);
      }
      setisPuttingTime(previsPuttingTime => !previsPuttingTime);
    }
  return (
    <>
        {(props.task.minutes != 0 || props.task.hours !=0) ? 
        <button onClick={handlePutTime} className={`rounded lg:p-[6px] p-[2px] lg:block hidden  bg-${color} lg:text-sm text-[10px]`}>Put Time</button> : ""}

        <button onClick={() => {setTaskToEdit(props.task); setisPuttingTime(false);}} className={`rounded lg:p-[6px] p-[2px]  bg-${color} lg:text-sm  text-[10px]`}>Edit</button>
        <button className={`rounded lg:p-[6px] p-[2px] lg:text-sm  bg-${color}  text-[10px]`} onClick={() => deleteTask(props.task._id)}>Delete</button>
    </>
  )
}
