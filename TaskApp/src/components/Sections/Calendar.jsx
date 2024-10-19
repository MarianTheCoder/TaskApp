import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {  useState , useRef, useContext} from 'react'
import { DateContext } from '../other/context/DateContext';


export default function Calendar() {

  const [black , setblack] = useState(false);
  const {newDate} = useContext(DateContext);

  const [time,setTime] = useState(new Date());
  const currentDate = new Date();

  const time1 = new Date(time.getFullYear() , time.getMonth() );
  const time2 = new Date(time.getFullYear() , time.getMonth() + 1, 0);
  
  const selectedCellRef = useRef(null);

  

  const saveDate = (event) => {
    // Reset the background color of the previously selected cell
    if (selectedCellRef.current) {
      if(black){
        selectedCellRef.current.classList.remove("bg-accent");
        selectedCellRef.current.classList.add("bg-black");
        setblack(false);
      }
      else{
        selectedCellRef.current.classList.remove("bg-high");
        selectedCellRef.current.classList.remove("bg-accent");
      }
    }
    // Set the background color of the newly selected cell
    selectedCellRef.current = event.target;

    const newDay  = selectedCellRef.current.innerText;
    if(currentDate.getFullYear() < time.getFullYear() || 
    (currentDate.getFullYear() === time.getFullYear() && 
    currentDate.getMonth() < time.getMonth()) || 
    (currentDate.getFullYear() === time.getFullYear() && 
    currentDate.getMonth() === time.getMonth() &&
    currentDate.getDate() <= newDay))
    {
      newDate(new Date(time.getFullYear() , time.getMonth() , newDay));
      if(selectedCellRef.current.classList.contains("bg-black")){
        selectedCellRef.current.classList.remove("bg-black")
        selectedCellRef.current.classList.add("bg-accent");
        setblack(true);
        
      }
      else{
        selectedCellRef.current.classList.add("bg-accent");
      }
    }
    else{
      newDate(null);
      selectedCellRef.current.classList.add("bg-high");
      console.log("selected date should be over the current date");
    }

   

    
    
    
  };

const nextMonth = () =>{
  setTime(new Date(time.getFullYear(), time.getMonth() + 1));
  newDate(null);
}

const prevMonth = () =>{
  setTime(new Date(time.getFullYear(), time.getMonth() - 1));
  newDate(null);
}

  

  //getDate  - ziua din luna curenta , ex: 23 
  //getDay - ce zi este , ex: 3 (miercuri) 
  //getMonth - luna respectiva , ex: 6 (iunie)
  //getFullYear - anul respectiv , ex: 2024

const getMonthName = () =>{
  switch(time.getMonth()){
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";

    }
}
 
const renderDaysOfCalendar = () =>{


  var calendar = [];
  var weekDays = [];

  var daySaved =  8 - time1.getDay() ;
  //adaugam spatii goale pana la prima zi din saptamana 
  for (let index = 0; index <= 6; index++) {
    if(index >= time1.getDay() && currentDate.getDate() == index && currentDate.getMonth() == time1.getMonth())
      weekDays.push(<td className='p-2 bg-black  font-bold hover:cursor-pointer  hover:bg-btn-hover  rounded-xl' onClick={saveDate} key={index}>{index - time1.getDay() + 1}</td>)
    else if(index < time1.getDay())
      weekDays.push(<td className='' key={index}>{}</td>)
    else{
      weekDays.push(<td className='p-2  font-bold hover:cursor-pointer  hover:bg-btn-hover rounded-xl ' onClick={saveDate} key={index}>{index - time1.getDay() + 1}</td>)
    }
  }
  calendar.push(<tr key={1}>{weekDays}</tr>)
  
  weekDays = [];

//adaugam zilele in calendar de dupa prima saptamana
  for (let index = daySaved; index <= time2.getDate(); index++) {
    if(currentDate.getDate() == index && currentDate.getMonth() == time2.getMonth()){

      weekDays.push(<td key={index*3 + 399} onClick={saveDate} className='p-2 bg-black  font-bold  hover:bg-btn-hover hover:cursor-pointer rounded-xl '>{index}</td>)
    }
    else{
      weekDays.push(<td key={index*2 + 100} onClick={saveDate} className='p-2  font-bold  hover:bg-btn-hover hover:cursor-pointer rounded-xl '>{index}</td>)
    }
    time1.setDate(index);
    if(time1.getDay() % 6  == 0 && time1.getDay() != 0){
      calendar.push(<tr className='' key={index}>{weekDays}</tr>);
      weekDays = [];
    }
  }

  //punem zilele ramase din luna
  if(weekDays.length != 0)
    calendar.push(<tr className='' key={69}>{weekDays}</tr>);

  return calendar;
}
  return (
    <>
    <div className=' flex p-2 rounded-xl bg-secondary  w-64 h-auto items-center justify-center  m-auto mx-3'>
      <table className='text-sm text-white '>
        <thead>
          <tr>
            <th colSpan={2}>{time.getFullYear()}</th>
            <th colSpan={2}>{getMonthName()}</th>
            <th></th>
            <th><FontAwesomeIcon icon={faCircleArrowLeft} className='text-lg hover:cursor-pointer hover:text-btn-hoverAcc' onClick={prevMonth}/></th>
            <th><FontAwesomeIcon icon={faCircleArrowRight} className=' hover:cursor-pointer  text-lg hover:text-btn-hoverAcc' onClick={nextMonth}/></th>
          </tr>
          <tr>
            <th className='p-1 text-accent'>Sun</th>
            <th className='p-1 text-accent'>Mon</th>
            <th className='p-1 text-accent'>Tue</th>
            <th className='p-1 text-accent'>Wed</th>
            <th className='p-1 text-accent'>Thu</th>
            <th className='p-1 text-accent'>Fri</th>
            <th className='p-1 text-accent'>Sat</th>

          </tr>
        </thead>
        <tbody className='text-center '>
            {renderDaysOfCalendar()}
            
        </tbody>
      </table>
    
    </div>
    </>
  )
}
