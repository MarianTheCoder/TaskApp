import React, { createContext, useState } from 'react'

// which task is in edit mode

export const editContext = createContext();

export const EditProvider = ({children}) => {

const [taskToEdit , setTaskToEdit] = useState(null);

  return (
    <editContext.Provider value={{taskToEdit , setTaskToEdit}}>
        {children}
    </editContext.Provider>
  )
}
