import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from './NoteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NameContext } from '../../other/context/NameContext';

export default function SelectedNote(props) {
    
    const {selNote , text , setText , title, setTitle , updateNote} = useContext(NoteContext);
    const [whatColor , setWhatColor] = useState(false);
    const {nameUser} = useContext(NameContext);

    useEffect(()=>{
        if(selNote !== null){
            setText(selNote.text);
            setTitle(selNote.title);
            const item = hexToRgb(selNote.color);
            if(item.red > 150 && item.blue > 150 && item.green > 150){
                setWhatColor(true);
            }
            else{
                setWhatColor(false);
            }
        }
        return () =>{
            console.log("aici");
            props.func();
        }
    },[selNote])

    function hexToRgb(hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');
      
        // Parse the r, g, b values
        let bigint = parseInt(hex, 16);
        let red = (bigint >> 16) & 255;
        let green = (bigint >> 8) & 255;
        let blue = bigint & 255;
      
        return { 
            red,
            green,
            blue
         };
      }

      const saveInWindow = async () =>{
       await updateNote();
       await  props.func();
      }

      const deleteNote = async () =>{
        try {
            const result = await axios.post("http://localhost:4000/api/deleteNote" , {name:nameUser , noteID:selNote._id});
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        finally{
            await  props.func(); 
        }
      }

  return (
    <div className=' p-4 m-2 rounded-xl grid grid-rows-[auto_1fr] font-OpenSans' style={{backgroundColor: selNote.color , color: whatColor ? "#000000" : "#FFFFFF"}}>
        <div className=' border-b-2 pb-2 px-2 flex justify-between items-center text-lg'>
            <div className=' flex items-center gap-2'>
                <FontAwesomeIcon className='pr-5 text-3xl hover:cursor-pointer ' onClick={saveInWindow} icon={faFloppyDisk}/>
                <label htmlFor="title">Title: </label>
                <input type="text" style={{backgroundColor: selNote.color}} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={15}  className='focus:outline-none' id='title'/>
            </div>
                <FontAwesomeIcon className='hover:cursor-pointer' onClick={deleteNote} icon={faTrashCan}/> 
        </div>
        <div className=' bg-slate-500'>
            <textarea name="" id="" style={{backgroundColor: selNote.color}} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}  className='w-full h-full  resize-none scrollbar-webkit  focus:outline-none p-2 pt-6'></textarea>
        </div>
    </div>
  )
}
