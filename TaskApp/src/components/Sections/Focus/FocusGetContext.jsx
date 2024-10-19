import React, { createContext, useContext, useEffect, useState } from 'react'
import { NameContext } from '../../other/context/NameContext';
import axios from 'axios';


export const focusContext = createContext();

export const FocusProvider = ({children}) => {

    const {nameUser} = useContext(NameContext);
    const [sesObj , setsesObj] = useState([])
    const [putTimeObj , setPutTimeObj] = useState(null);

    const fetchDataSes = async () =>{
        try{
            const result = await axios.post("http://localhost:4000/api/getSessions" , {name:nameUser});
            console.log("The sessions fetched: " , result);
            setsesObj(result.data);
           
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
      if(nameUser != null && nameUser != undefined)
        fetchDataSes()
    }, [nameUser])
    

  return (
    <focusContext.Provider value={{fetchDataSes , sesObj , putTimeObj , setPutTimeObj}}>
        {children}
    </focusContext.Provider>
  )
}
