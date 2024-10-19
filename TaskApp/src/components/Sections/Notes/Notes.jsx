import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NameContext } from '../../other/context/NameContext';
import NoteList from './NoteList';
import SelectedNote from './SelectedNote';
import { NoteContext } from './NoteContext';


export default function Notes() {

  const [notes , setNotes] = useState([]);
  const [title , setTitleComp] = useState("");
  const [colorNote , setcolorNote] = useState('#5b23a0');
  const {nameUser} = useContext(NameContext);
  const {selNote ,setselNote , setTitle  , setText} = useContext(NoteContext);

  useEffect(()=>{
    if(nameUser != null && nameUser != undefined)
      fetchNotes();
    return() =>{
      setselNote(null);
      setTitle("");
      setText("")
    }
  },[nameUser])

  const fetchNotes = async () =>{
    try {
      const result = await axios.post("http://localhost:4000/api/getNotes" , {name:nameUser});
      console.log("Notes fetched: " ,   result);
      if(result){
        setNotes(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postNote = async () =>{
    const newnote = {
      title: title,
      color: colorNote,
      lastModified: new Date()
    }
    try {
      const result = await axios.post("http://localhost:4000/api/postNote" , {name:nameUser , note:newnote});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    finally{
      fetchNotes();
      setTitleComp("");
      setcolorNote('#5b23a0');
    }
  }


  return (
    <div className='grid h-screen  lg:grid-cols-[auto_1fr] font-OpenSans font-bold text-white'>
        <div className='bg-secondary overflow-hidden   rounded-xl  p-4 flex flex-col m-4  '>
        <section className='flex   flex-col items-center gap-2'>
          <label htmlFor="">Title</label>
          <input type="text" maxLength={15} value={title} spellCheck={false} onChange={(e) => setTitleComp(e.target.value)} className='text-black  rounded w-full p-1' />
          <div className=' items-center flex flex-row w-full gap-2 mt-2 justify-between'>
            <label htmlFor="color" className=' flex-initial text-sm'>Select Note Color</label> 
            <input value={colorNote}  onChange={(e) => setcolorNote(e.target.value)} className=' flex-initial rounded-xl w-8 h-8' type="color" name="" id="color"/>
            <FontAwesomeIcon className='text-3xl  text-accent hover:text-btn-hoverAcc hover:cursor-pointer' onClick={() => postNote()} icon={faPlus}/>
          </div>
        </section>
        <NoteList objects = {notes}/>

      </div>
      
      {selNote !== null && <SelectedNote func = {fetchNotes}/> }  
      
    </div>
  )
}
