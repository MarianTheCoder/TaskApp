import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { NameContext } from "../../other/context/NameContext";

export const NoteContext = createContext();

export const NoteProvider = ({children}) =>{

    const [selNote , setselNote] = useState(null);
    const {nameUser} = useContext(NameContext);

    const [text , setText] = useState("");
    const [title , setTitle] = useState("");
    
    const getTheNote  = async (item) =>{
        try {
            const result = await axios.post("http://localhost:4000/api/getTheNote",{name:nameUser,noteID:item._id});
            setselNote(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateNote = async () =>{
        try {
             const result = await axios.put("http://localhost:4000/api/updateNote" , {name:nameUser , title:title , text:text , noteID:selNote._id});   
             console.log(result);

        } catch (error) {
            console.log(error);
        }
    }


    return(
    <NoteContext.Provider value={{getTheNote , selNote , setselNote , updateNote , text , setText , title, setTitle}}>
        {children}
    </NoteContext.Provider>
)}