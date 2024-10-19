import { faCaretRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { NoteContext } from './NoteContext'

export default function NoteList(props) {

    const {getTheNote , selNote , setselNote , updateNote} = useContext(NoteContext);

    const handleGetNote = (item) =>{
        if(selNote === null){
            getTheNote(item);
        }
        else if(selNote._id !== item._id){
            updateNote();
            getTheNote(item);
        }
        else{
            updateNote();
            setselNote(null);
        }
    }

  

    const hexToRgb = (hex) => {
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

      const megafunc = (item) =>{
        const newItem = hexToRgb(item.color);
        if(newItem.red > 150 && newItem.blue > 150 && newItem.green > 150){
            return "#000000";
        }
        else{
            return "#FFFFFF";
        }
      }

      props.objects.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

  return (
    <div className='flex flex-col gap-2 overflow-auto scrollbar-webkit pr-2 my-4 mt-8 font-bold font-OpenSans'>
        {props.objects.map((obj,index) =>
            <div key={index} className=" p-3 px-4 rounded-xl flex items-center justify-between hover:cursor-pointer " onClick={() => handleGetNote(obj)} style={{backgroundColor: obj.color}}>
                     <p style={{color: megafunc(obj)}}>{obj.title} </p>
                <FontAwesomeIcon className='' style={{color: megafunc(obj)}} icon={faCaretRight}/> 
                
            </div>            
        )}  

    </div>
  )
}
