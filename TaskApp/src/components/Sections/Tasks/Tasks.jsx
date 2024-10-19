import React, { useContext, useEffect, useRef, useState } from 'react'
import Calendar from '../Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NameContext } from '../../other/context/NameContext';
import { DateContext } from '../../other/context/DateContext';
import TaskItems from './TaskItems';
import { taskContext } from '../../other/context/TasksContext';
import "../../../assets/index.css"
import { editContext } from '../../other/context/EditContext';
import PutHours from './PutHours';
import { PutTimeContext } from '../../other/context/PutTimeContext';
import useWindowSize from '../../other/ResizeHook';

export default function Tasks() {
  const [prioButton,setPrioButton] = useState(false);
  const buttonRef = useRef(null);
  const {taskToEdit , setTaskToEdit} = useContext(editContext);
  
  
  const [nrInputH , setnrInputH] = useState('');
  const [nrInputM , setnrInputM] = useState('');
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCalendar , setShowCalendar] = useState(false);

  //States ce le vom salva
  const [text , setText] = useState('');
  const [title , setTitle] = useState('');
  const [valueHours, setValueHours] = useState(0);
  const [valueMinutes, setValueMinutes] = useState(0);
  const [prioColor , setPrioColor] = useState("low") ;

  


  //good for different screen sizes
  useEffect(() => {
    setisPuttingTime(false);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize); // In case of reload

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  const Clear = () =>{
      newDate(null);
      setText("");
      setTitle("");
      setValueHours(0);
      setValueMinutes(0);
      setPrioColor("low");
      if(showCalendar == true)
       setShowCalendar(false);
  }
  useEffect(() =>{
    if(taskToEdit !== null){
      setText(taskToEdit.description);
      setTitle(taskToEdit.title);
      setValueHours(taskToEdit.hours);
      setValueMinutes(taskToEdit.minutes);
      setPrioColor(taskToEdit.priority);
      if(taskToEdit.date){
        const dateNew = new Date(taskToEdit.date);
        newDate(dateNew);
        }
      else{
        newDate(null);
      }
    }
    else{
      Clear();
    }
  },[taskToEdit])

  const handleCalendar = (event) =>{
    event.preventDefault()
    if(showCalendar == true)
      newDate(null);
    setShowCalendar(prevshowCalendar => !prevshowCalendar)

  }

  const handleHours = (event) => {
    const inputValue = event.target.value;
     if(inputValue !== ''){
        if (/^\d{0,2}$/.test(inputValue) && Number(inputValue) >= 0 && Number(inputValue) <= 99) {
      
          setValueHours(inputValue);
          setnrInputH("");
        }
        else{
          setValueHours("");
        }
    } 
    else{
      setValueHours("");
      setnrInputH("");
    }
  };

  const handleMinutes = (event) => {
    const inputValue = event.target.value;
     if(inputValue !== ''){
        if (/^\d{0,2}$/.test(inputValue) && Number(inputValue) >= 0 && Number(inputValue) <= 60) {
          setValueMinutes(inputValue);
          setnrInputM("");
        }
        else{
          setValueMinutes("");
        }
    } 
    else{
      setValueMinutes("");
      setnrInputM("");
    }
  };



  // submit the task
  const {nameUser}  = useContext(NameContext);
  const {date , newDate} = useContext(DateContext);
  const {userObjects , fetchData} = useContext(taskContext);
  
  const handleSubmit = async (e) =>{
      e.preventDefault();
      let hoursCheck;
      let minutesCheck;
      if(valueHours == ""){
        hoursCheck = 0;
      }
      else{
        hoursCheck = valueHours;
      }
      if(valueMinutes == ""){
        minutesCheck = 0;
      }
      else{
        minutesCheck = valueMinutes;
      }
      const task = {
        title:title,
        description:text,
        priority:prioColor, 
        hours:hoursCheck,
        minutes:minutesCheck,
        date:date
      }
      if(task.date == null){
        console.log("delete date , not ok");
          delete task.date;
        }
     
      try{  
        //check if we are editing task or creating a new one
        if(taskToEdit !== null)
        {
          console.log("Submit editing task");
          const result = await axios.put('http://localhost:4000/api/editTask' , {name:nameUser,id:taskToEdit._id,task:task});
          setTaskToEdit(null);
          fetchData();
          
        }
        else
        {
          const result = await axios.post('http://localhost:4000/api/sendTask' , {name:nameUser,task});
          if(result){
            console.log(result.data);
            fetchData();
            
             }
            Clear();
           }
        }
      catch(err){
        console.log(err);
        setTaskToEdit(null);
      }
  }
  const size = useWindowSize();
 const {isPuttingTime , setisPuttingTime} = useContext(PutTimeContext);

  return (
    <>
    {/* Calendar and taskitems */}
      <div className="grid h-screen  grid-rows-[1fr_auto] ">
        <div className='  grid overflow-hidden xl:grid-cols-[1fr_280px]'>
          <div className=' overflow-auto mb-4 scrollbar-webkit    pl-12 pr-4  '>
            <TaskItems/>
          </div>
          <div className='grid grid-rows-[auto_1fr]'>
            <div className='w-full h-auto  '>
               {isPuttingTime && <PutHours/>}
            </div>
            {showCalendar && <Calendar/>}
          </div>
        </div>
        
        {/* Task form depending if is a new task OR a task to EDIT */}
        {/* DEPENDING ON WIDTH */}
        { size.width > 1024 ? 
        <div className='  flex pl-12 py-2 text-white  font-OpenSans'>
          <form action="" className=' w-w90 h-full bg-secondary rounded-xl grid grid-cols-[auto_auto] p-4'>
              <div className=''>
                  <label htmlFor="" className=' font-bold pr-2 pl-16'>Title</label>
                  <input type="text" spellCheck="false" name='title' value={title}  id='title' maxLength={20} onChange={(e) => setTitle(e.target.value)} className='rounded text-black py-1 px-3'/>
                  <div className='flex items-center pt-4  pl-2'>
                      <label htmlFor="" className=' pr-2 font-bold'>Description</label>
                      <textarea name="description" spellCheck="false" value={text}  cols={windowWidth < 1650 ? 25 : 80} rows={3} id="description" className='  rounded text-black p-1 text-sm resize-none' onChange={(e) => setText(e.target.value)}></textarea>
                  </div>
              </div>
              <div className='flex items-end  justify-evenly  gap-8'>
                {/* Section about Priority ,  setNrHours , setDate and submit! */}
                {/* FIRST SECTION ABOUT PRIO */}
                  <section onMouseEnter={() => setPrioButton(true)}  onMouseLeave = {() => setPrioButton(false)} className='  relative'> 
                    <button disabled className={`   p-1 px-3 rounded bg-${prioColor}`}  ref={buttonRef} >Priority</button>
                    {prioButton && <div className=' absolute flex flex-col items-center  h-auto  bottom-8  '
                    style={{ width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : 'auto' }}>
                      <a onClick={ () => setPrioColor("low")} className='rounded hover:cursor-pointer bg-low p-1 w-full text-center '>Low</a>
                      <a onClick={() => setPrioColor("medium") } className='rounded hover:cursor-pointer bg-medium p-1 w-full text-center '>Med !</a>
                      <a onClick={() => setPrioColor("high") } className='rounded hover:cursor-pointer  bg-high p-1 w-full text-center '>High !!</a>
                    </div>}
                  </section>


                    {/* Second section about HOURS YOU WANT TO PUT IN */}
                  <section className=' font-bold'>
                    <p className='text-center pb-1'>Set Time</p>
                    <div className='flex gap-1 text-black items-center '>
                      <input type="text" value={valueHours}  min={0} max={99} onChange={(e) => handleHours(e)} maxLength={2} className={`p-1 text-${nrInputH} text-center rounded w-10`} />
                      <label htmlFor="" className=' text-accent font-bold'>:</label>
                      <input value={valueMinutes}  onChange={(e) => handleMinutes(e)} type="text"  max={60} maxLength={2} className={`p-1 text-${nrInputM} text-center rounded w-10`} />
                    </div>
                  </section>
                  {/*THIRD SECTION ABOUT CALENDAR */}
                  <section className=' '>
                    <button onClick={handleCalendar} className={`p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc`}   >Set Date</button>  
                  </section>
                  <section>
                    {taskToEdit !== null ? <button onClick={() => setTaskToEdit(null)} className={`p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc`}>Cancel</button> : ''}
                  </section>
                  <button className='  '><FontAwesomeIcon className='text-accent hover:text-btn-hoverAcc text-3xl' onClick={handleSubmit} icon={faCirclePlus}/></button>
              </div>
          </form>
        </div>
         : 
        <div className='  flex  py-2 text-white  font-OpenSans'>
        <form action="" className=' w-screen h-full bg-secondary rounded-xl flex flex-col p-4'>
            <div className=' flex flex-col pl-2'>
                <label htmlFor="" className=' font-bold'>Title</label>
                <input type="text" spellCheck="false" name='title' value={title}  id='title' maxLength={20} onChange={(e) => setTitle(e.target.value)} className='rounded text-black py-1 px-3'/>
                <div className='flex flex-col  pt-4  '>
                    <label htmlFor="" className=' pr-2 font-bold'>Description</label>
                    <textarea name="description" spellCheck="false" value={text}  cols={windowWidth < 1650 ? windowWidth < 1024 ? 20 : 40  : 80} rows={3} id="description" className='  rounded text-black p-1 text-sm resize-none' onChange={(e) => setText(e.target.value)}></textarea>
                </div>
            </div>
            <div className='flex items-end  justify-evenly  '>
              {/* Section about Priority ,  setNrHours , setDate and submit! */}
              {/* FIRST SECTION ABOUT PRIO */}
                <section onMouseEnter={() => setPrioButton(true)}  onMouseLeave = {() => setPrioButton(false)} className='  relative'> 
                  <button disabled className={`   p-1 px-3 rounded bg-${prioColor}`}  ref={buttonRef} >Priority</button>
                  {prioButton && <div className=' absolute flex flex-col items-center  h-auto  bottom-8  '
                  style={{ width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : 'auto' }}>
                    <a onClick={ () => setPrioColor("low")} className='rounded hover:cursor-pointer bg-low p-1 w-full text-center '>Low</a>
                    <a onClick={() => setPrioColor("medium") } className='rounded hover:cursor-pointer bg-medium p-1 w-full text-center '>Med !</a>
                    <a onClick={() => setPrioColor("high") } className='rounded hover:cursor-pointer  bg-high p-1 w-full text-center '>High !!</a>
                  </div>}
                </section>


                  {/* Second section about HOURS YOU WANT TO PUT IN */}
                <section className=' font-bold'>
                  <p className='text-center pb-1'>Set Time</p>
                  <div className='flex gap-1 text-black items-center '>
                    <input type="text" value={valueHours}  min={0} max={99} onChange={(e) => handleHours(e)} maxLength={2} className={`p-1 text-${nrInputH} text-center rounded w-10`} />
                    <label htmlFor="" className=' text-accent font-bold'>:</label>
                    <input value={valueMinutes}  onChange={(e) => handleMinutes(e)} type="text"  max={60} maxLength={2} className={`p-1 text-${nrInputM} text-center rounded w-10`} />
                  </div>
                </section>
                {/*THIRD SECTION ABOUT CALENDAR */}
                  {taskToEdit !== null ? <button onClick={() => setTaskToEdit(null)} className={`p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc`}>Cancel</button> : ''}
                
                <button className='  '><FontAwesomeIcon className='text-accent hover:text-btn-hoverAcc text-3xl' onClick={handleSubmit} icon={faCirclePlus}/></button>
            </div>
        </form>
      </div>}
        
      </div>
    </>
  )
}
