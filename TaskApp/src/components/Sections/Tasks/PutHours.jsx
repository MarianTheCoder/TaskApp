import React, { useContext, useEffect, useState } from 'react'
import { PutTimeContext } from '../../other/context/PutTimeContext';
import axios from 'axios';
import { NameContext } from '../../other/context/NameContext';
import { taskContext } from '../../other/context/TasksContext';

export default function PutHours() {
    
    const [isActive, setIsActive] = useState(false);
    const {nameUser} = useContext(NameContext)
    const {fetchData} = useContext(taskContext);
    const {hoursInCont , setHoursInCont , minutesInCont , setminutesInCont , setisPuttingTime , taskToPutTime} = useContext(PutTimeContext);

    const handlePut = async ()=>{
        try{
           const result = await axios.put("http://localhost:4000/api/putTime", {name:nameUser , id:taskToPutTime , hours:hoursInCont , minutes:minutesInCont});
           if(result){
             console.log("Time was put succesfully");
           }
           else{
            console.log("Time was NOT put");
           }
                
        }
        catch(err){
            console.log(err);
        }
        finally{
            setisPuttingTime(false);
            fetchData();
        }

    }

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                
                setminutesInCont(prevminutesInCont=> {
                    
                    if (prevminutesInCont === 59) {
                        setHoursInCont(prevhoursInCont => prevhoursInCont + 1);
                        return 0;
                    } else {
                        return prevminutesInCont+ 1;
                    }
                });
            }, 1000);
        } else if (!isActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };
    const handleCancel = () =>{
        setisPuttingTime(false);
    }

  return (
    <>
        <div className='flex flex-col justify-center bg-secondary text-white  items-center p-2 rounded-xl m-3  font-OpenSans  '>
            <p className=' text-3xl tracking-wider font-bold my-2'>
                {hoursInCont < 10 ?  "0" + hoursInCont : hoursInCont} 
                <span className='text-accent'> : </span> 
                {minutesInCont < 10 ?  "0" + minutesInCont : minutesInCont}
            </p>
            <div className='flex flex-row gap-3'>
            {!isActive ? 
                <button onClick={handleStart} className='mb-2 p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc'>Start</button> :
                <button onClick={handleStop} className='mb-2 p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc'>Stop</button>     
            }

            {(hoursInCont > 0 || minutesInCont>0) && !isActive ? 
                <div>
                    <button onClick={handlePut} className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc'>Put</button> 
                </div> 
                : ""
            }

            {(hoursInCont > 0 || minutesInCont>0) ? 
                <div>
                    <button onClick={handleCancel} className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc'>Cancel </button> 
                </div> 
                : ""
            }
        
            </div>
        </div>
    </>
  )
}
