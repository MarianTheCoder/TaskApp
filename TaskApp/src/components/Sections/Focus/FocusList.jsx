import React, { useContext, useEffect, useState } from 'react'
import { focusContext } from './FocusGetContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { NameContext } from '../../other/context/NameContext';
import axios from 'axios';


export default function FocusList() {

    const {sesObj , setPutTimeObj , putTimeObj , fetchDataSes} = useContext(focusContext);
    const [selected , setSelected] = useState(-1);

    useEffect(() =>{
        if(selected == -1)
        setPutTimeObj(null);
    });

    const handleSelected = (index) =>{
        if(selected == index){

            setSelected(-1);
            setPutTimeObj(null);
        }
        else{
            setPutTimeObj(null);
            setSelected(index);
        }
    }

    const handleTotal = (item) =>{
        let hour = 0 , minute = 0 , second = 0;
        item.forEach(element => {
            second += element.seconds;
            minute += element.minutes;
            hour  += element.hours;
        });
        console.log(hour , minute , second)
        hour = Math.floor(hour + (minute +(second / 60)) / 60);
        minute = Math.floor((minute + (second / 60)) % 60);
        second = Math.floor(second % 60); 
        console.log(hour , minute , second)
        return <p><span className='text-lg text-accent'>Total:</span> {hour}H <span className='text-xl text-accent'>:</span> {minute}M <span className='text-xl text-accent'>:</span> {second}S</p>
    }

    const handleAddTime = (item)=>{
        if(putTimeObj === null){

            setPutTimeObj(item);
        }
        else{

            setPutTimeObj(null);
        }
    }
    
    const {nameUser} = useContext(NameContext);

    const deleteTime = async (time , ses) =>{
     try {
        const result = await axios.post("http://localhost:4000/api/deleteTime" , {name:nameUser , sessionID:ses._id , sessionTimeID:time._id})
        console.log(result);

     } catch (error) {
        console.log(error);
     }
     finally{
        fetchDataSes();
     }

    }
    const handleDeleteSession = async (ses) =>{
        try{
            const result = await axios.post("http://localhost:4000/api/deleteSes" , {name:nameUser , sessionID:ses._id});
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
        finally{
            fetchDataSes();
            setSelected(-1);
        }
    }

  return (
    <>
    <div>

            {sesObj.map((ses,index) =>
            //whole div 
            <div key={index} className=' min-w-64 overflow-auto  bg-secondary p-6 rounded-xl mx-6 mb-6 gap-4  text-white flex justify-center flex-col font-bold'>
                {/* div for click on the name to expand */}
                {selected === index ?
                <div className='flex flex-row gap-2  justify-center'>
                    <FontAwesomeIcon icon={faAnglesUp}/>
                    <p className=' hover:cursor-pointer' onClick={()=>handleSelected(index)} key={index}>{ses.focusName}</p>
                    <FontAwesomeIcon icon={faAnglesUp}/>
                </div>
                :
                <div className='flex flex-row gap-2  justify-center'>
                    <FontAwesomeIcon icon={faAnglesDown}/>
                    <p className=' hover:cursor-pointer' onClick={()=>handleSelected(index)} key={index}>{ses.focusName}</p>
                    <FontAwesomeIcon icon={faAnglesDown}/>
                </div>
                }
                {selected === index ? 
                <div className='flex flex-col gap-2'>
                     <button className=' p-1 px-3 rounded bg-high hover:bg-high_btn' onClick={() => handleDeleteSession(ses)}>Delete</button> 
                    <button className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={() => handleAddTime(ses)}>Add Time</button> 
                </div>
                
                : ""}
                {selected === index ? ses.time.map((newses,index) =>
                // div for every time content
                <div key={index} className='flex flex-row items-center gap-2 justify-center'>
                        <p>{newses.hours}H <span className=' text-xl text-accent'>:</span> {newses.minutes}M <span className=' text-xl text-accent'>:</span> {newses.seconds}S</p>
                        <button className='p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={() => deleteTime(newses , ses )}>Del</button>
                </div>  
                )  
            :
            ""
            }
            {selected === index ?
             <div className='border font-bold font-OpenSans flex justify-center rounded-xl'>
                {handleTotal(ses.time)}
            </div>
            : ""}

            </div>
            )}
        </div>
    </>
  )
}
