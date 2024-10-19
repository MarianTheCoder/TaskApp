import React, { useContext, useEffect, useRef, useState } from 'react'
import { focusContext } from './FocusGetContext';
import { NameContext } from '../../other/context/NameContext';
import axios from 'axios';

export default function Clock() {

    const {nameUser} = useContext(NameContext);
    const [seconds , setSeconds] = useState(0);
    const [minutes , setMinutes] = useState(0);
    const [hours , setHours] = useState(0);
    const [active , setActive] = useState(false);
    const { setPutTimeObj , putTimeObj , fetchDataSes} = useContext(focusContext);

    const intervalRef = useRef(null);
  
    const putTime = async () =>{
        const time = {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        try{
            const result = await axios.post('http://localhost:4000/api/putSesTime' , {name:nameUser , sessionID:putTimeObj._id , time:time});
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setActive(false);
            setSeconds(0);
            setHours(0);
            setMinutes(0);
            fetchDataSes();
        }
    }

    useEffect(() => {
      if (active) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
  
        console.log('Setting interval');
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
              setMinutes((prevMinutes) => {
                if(prevMinutes == 59){
                    setHours(prevhours => prevhours + 1);
                    return 0;
                }
                else{
                    return prevMinutes + 1;
                }
              });
              return 0;
            } else {
              return prevSeconds + 1;
            }
          });
        }, 1000);
      } else {
        if (intervalRef.current) {
          console.log('Clearing interval');
          clearInterval(intervalRef.current);
        }
      }
  
      return () => {
        if (intervalRef.current) {
          console.log('Cleanup interval');
          clearInterval(intervalRef.current);
        }
      };
    }, [active]);

    const startClock = () =>{
        setActive(active => !active);
    }

    const cancelPutTime = () =>{
        setPutTimeObj(null);
    }

  return (
    <>
        <div className='flex flex-col'>
       {/* section for the TIme */}
        <section className=' text-white  font-bold gap-2  grid grid-rows-[1fr_auto_auto] border rounded-xl'>
            {/* div for hours / minutes / seconds */}
            <div className='font-bold flex gap-2 items-center justify-evenly mt-3  flex-row'>
                    <div className=' bg-accent text-2xl inline-block  text-center rounded tracking-wide p-2'>
                    {hours > 9 ? <p>{hours}</p> : <p>0{hours}</p>}
                    </div>
                <span>:</span> 
                    <div className='  bg-accent text-2xl   inline-block  text-center rounded tracking-wide p-2'>
                        {minutes > 9 ? <p>{minutes}</p> : <p>0{minutes}</p>}
                    </div >
                <span>:</span> 
                    <div className=' bg-accent text-2xl   inline-block  text-center rounded tracking-wide p-2'>
                    {seconds > 9 ? <p>{seconds}</p> : <p>0{seconds}</p>}
                    </div>
            </div>
            <div className='grid gap-3 grid-cols-3  '>   
                <div className='px-2 pl-3 py-1'>Hours</div>
                <div className='px-2 py-1'>Minutes</div>
                <div className='px-2 py-1'>Seconds</div>
            </div> 
        </section>
            <div className=' grid grid-cols-3 mt-3  gap-4 text-white  font-OpenSans  font-bold'>
                <button className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={startClock}>{active ? "Stop" : "Start"}</button>
                {seconds > 0 || minutes > 0 || hours > 0 ? <button className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={putTime}>Put</button> : ""}              
                <button className='col-start-3 p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={cancelPutTime}>Cancel</button>
            </div>
        </div>
        
    </>
  )
}
