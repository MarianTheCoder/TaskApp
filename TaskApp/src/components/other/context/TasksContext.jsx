import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { NameContext } from './NameContext';

export const taskContext = createContext();


export const TasksProvider = ({children}) => {
    const {nameUser} = useContext(NameContext);
    const [userObjects, setUserObjects] = useState([]);
    
    const fetchData = async () =>{
        try{

            const res = await  axios.post("http://localhost:4000/api/getTask" , {name:nameUser});
            if(res){
                console.log("Tasks fetched: " , res);
                setUserObjects(res.data);
            }
            else{
                console.log("Fetch the data did not work / empty");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
    if(nameUser != null && nameUser != undefined)
        fetchData();
    },[nameUser])

    const deleteTask = async (obj) =>{
        try{
            const result = await axios.post(`http://localhost:4000/api/deleteTask` ,{name:nameUser , id:obj} )
            if(result){
                console.log("Task deleted succesfully");
                fetchData();
            }
            else{
                console.log("Task could not be deleted , some error");
            }
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
        <taskContext.Provider value={{userObjects , fetchData , deleteTask}}>
            {children}
        </taskContext.Provider>
    </>
  )
}
