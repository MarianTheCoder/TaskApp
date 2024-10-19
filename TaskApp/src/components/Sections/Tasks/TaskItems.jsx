
import {faCircle, faCircleCheck} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { taskContext } from '../../other/context/TasksContext'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import CheckTasks from './CheckTasks_PutHours'


export default function TaskItems() {
    const [hover,setHover] = useState(null);
    const [caret,setCaret] = useState(null);
    const {userObjects ,deleteTask} = useContext(taskContext);
    const currentDate = new Date();
    const colorOfDate = "secondary";

    const handleHover = (index) =>{
          setHover(index);
    }
    const handleCaret = (index) =>{
        if(caret == index)
            setCaret(null);
        else{
            setCaret(index);
        }
    } 
    const istheDay = (theTask) =>{
        const newDate = new Date(theTask.date);
        if(currentDate.getFullYear() < newDate.getFullYear() || 
        (currentDate.getFullYear() === newDate.getFullYear() && 
        currentDate.getMonth() < newDate.getMonth()) || 
        (currentDate.getFullYear() === newDate.getFullYear() && 
        currentDate.getMonth() === newDate.getMonth() &&
        currentDate.getDate() < newDate.getDate())){
            return "secondary";
        }
        else if(currentDate.getFullYear() === newDate.getFullYear() && 
        currentDate.getMonth() === newDate.getMonth() &&
        currentDate.getDate() === newDate.getDate()){
            return theTask.priority;
        }
        else
            return "graybg";
    }

    const getDate = (date) =>{
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        return <p className='text-[6px] lg:text-base'><span className='font-bold lg:text-base' >Date: </span>{year}/{month}/{day}</p>
    }

    const priorityMapping = {
        'low': 1,
        'medium': 2,
        'high': 3
      };
    
      const moveTheGray = (array , criteria) =>{
          const items = array.filter(dateExpired);
          const NOTitems = array.filter(item => !dateExpired(item));
          const finalItems = items.concat(NOTitems);
          return finalItems;
      }

      const dateExpired = (item) =>{
        if(item.date == undefined)
            return true;
        else{
            const newDate = new Date(item.date);
            if(currentDate.getFullYear() < newDate.getFullYear() || 
            (currentDate.getFullYear() === newDate.getFullYear() && 
            currentDate.getMonth() < newDate.getMonth()) || 
            (currentDate.getFullYear() === newDate.getFullYear() && 
            currentDate.getMonth() === newDate.getMonth() &&
            currentDate.getDate() <= newDate.getDate())){
                return true;
            }
            else return false;
        }
      }
      // Sort tasks by priority using the mapping
      const sortedTasks = userObjects.sort((a, b) => priorityMapping[b.priority] - priorityMapping[a.priority]);
      const newsortedTasks = moveTheGray(sortedTasks , dateExpired);

  return (
    <>
    {newsortedTasks.filter(obj => !obj.date).map((object,index) =>( 
        <div key={index} className={` bg-${object.priority} w-full grid grid-flow-row  lg:p-4 p-2 lg:px-8 my-2 h-auto rounded-xl  lg:text-base text-[10px] text-white font-OpenSans`}>
        <div className='grid grid-cols-[1fr_auto]'>
            <div  key={index} className='flex items-center gap-4' >
                <FontAwesomeIcon  icon={hover === index ? faCircleCheck : faCircle} 
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setHover(null)}
                onClick={() => deleteTask(object._id)}
                className='lg:text-xl lg:pr-4'/>
                {object.description !== '' ? <FontAwesomeIcon onClick={() => handleCaret(index)} className='lg:px-2' icon={faCaretDown}/> : ''}
                <p><span className=' font-bold pr-1 lg:pr-2'>Title:</span>{object.title}</p>
                
            </div>  
            <div className='flex flex-row items-center gap-1 lg:gap-5'> 
                    {(object.minutes != 0 || object.hours !=0) ?
                    <div className='flex flex-row gap-1 border p-1 rounded-xl px-3'>
                        {/* Hours put in and remaining */}
                        <p className='text-black font-bold'>{object.hoursIn}H<span className='text-white'> : </span>{object.minutesIn}M <span className='text-white'>/</span> {object.hours}H<span className='text-white'> : </span>{object.minutes}M</p> 
                        {(object.minutesIn >= object.minutes) && (object.hoursIn >= object.hours)  ? <p className=' font-bold'>Done</p> : ""}
                    </div>
                    : ""}
                    <CheckTasks task={object}/>
            </div> 
             </div> 
            <div className=' grid grid-cols-1'>
                {caret == index ? <p className=' break-words pt-4'><span className=' font-bold'>Description:</span> {object.description}</p> : ""}
            </div>
         </div>
))}
<div className=' w-full h-4 bg-secondary rounded-xl my-6'>

</div>
    {newsortedTasks.filter(obj => obj.date).map((object,index) =>( 
        <div key={index+100} className={` bg-${istheDay(object)} w-full grid grid-flow-row  lg:p-4 lg:px-8 p-2 my-2 h-auto rounded-xl lg:text-base text-[10px]   text-white font-OpenSans`}>
            <div className='grid grid-cols-[1fr_auto]'>
                <div  key={index+100} className='flex items-center gap-1   lg:gap-4' >
                    <FontAwesomeIcon  icon={hover === index + 100 ? faCircleCheck : faCircle} 
                    onMouseEnter={() => handleHover(index+100)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => deleteTask(object._id)}
                    className='lg:text-xl lg:pr-4'/>
                    {object.description !== '' ? <FontAwesomeIcon onClick={() => handleCaret(index+100)} className='px-2' icon={faCaretDown}/> : ''}
                    <p><span className=' font-bold pr-1 lg:pr-2'>Title:</span>{object.title}</p>
                    {getDate(object.date)}
                </div>
                <div className='flex flex-row items-center lg:gap-5 gap-1' > 
                {(object.minutes != 0 || object.hours !=0) ?
                    <div className='flex flex-row gap-1 border text-[6px] lg:text-base  p-1 rounded-xl px-3'>
                        {/* Hours put in and remaining */}
                        <p className='text-white font-bold'>{object.hoursIn}H <span className='text-white'> : </span>{object.minutesIn}M <span className='text-white'>/</span> {object.hours}H<span className='text-white'> : </span>{object.minutes}M</p> 
                        {(object.minutesIn >= object.minutes) && (object.hoursIn >= object.hours)  ? <p>Done</p> : ""}
                    </div>
                    : ""}
                    
                    {/* Buttons for delete and edit */}
                    <CheckTasks task={object}/>
                 </div>  
            </div>
            <div className=' grid grid-cols-1'>
                {caret == index + 100 ? <p className=' break-words pt-4'><span className=' font-bold'>Description:</span> {object.description}</p> : ""}
            </div>
         </div>
        
))}
        
    </>
  )
}
