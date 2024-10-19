import axios from 'axios';
import React, { useContext, useState } from 'react'
import { NameContext } from '../../other/context/NameContext';
import { focusContext } from './FocusGetContext';
import FocusList from './FocusList';
import Clock from './Clock';

export default function Focus() {

  const {nameUser} = useContext(NameContext);
  const {fetchDataSes , putTimeObj , setPutTimeObj} = useContext(focusContext);
  const [sesName , setsesName] = useState('');


  const handleSubmit = async (e)=>{
    const ses = {
      focusName: sesName
    }
    console.log(ses)
    e.preventDefault();
    try{
      const check = await axios.post("http://localhost:4000/api/newFocus" , {name:nameUser , object:ses});
      if(check){
        console.log("New focus Session added");
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setsesName('');
      fetchDataSes();
    }
  }
  return (
    <>
      <div className='grid h-screen grid-rows-[1fr_auto] font-OpenSans'>
        <div className='grid lg:grid-cols-[1fr_300px]  overflow-hidden'>
          {/* Time in here */}
            <div className="  flex justify-center  items-end">
            {putTimeObj ? <div className='bg-secondary p-6 lg:w-3/4 lg:h-3/4 mb-6 lg:mt-0 mt-6 rounded-xl flex justify-center items-center'>
                     <Clock/>
                  </div>
                  : ""}
            </div>
            {/* list of properties */}
            <div className='   my-6 overflow-auto scrollbar-webkit  '>
                <FocusList/>
            </div>
            {/* Submitter */}
        </div>
          <div className=' w-screen lg:w-full h-auto rounded flex justify-center text-sm lg:text-base  mb-2'>
              <form className=' bg-secondary rounded-xl w-w90  lg:gap-12 text-white p-6 grid lg:flex gap-2 justify-center font-bold items-center' action="">
                <label className=''>Define new Session Name (6-20 characters)</label>
                <input type="text" maxLength={12} value={sesName} onChange={(e) => setsesName(e.target.value)} className='rounded p-1 text-black' />
                <button className=' p-1 px-3 rounded bg-accent hover:bg-btn-hoverAcc' onClick={handleSubmit}>Submit</button>
              </form>
          </div>
      </div>
    </>
  )
}
