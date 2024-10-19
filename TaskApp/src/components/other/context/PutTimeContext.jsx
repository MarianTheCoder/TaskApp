import React, { createContext, useEffect, useState } from 'react'

export const PutTimeContext = createContext();

export const PutTimeProvider = ({children}) =>{

    const [isPuttingTime , setisPuttingTime] = useState(false);
    const [hoursInCont , setHoursInCont] = useState(0);
    const [minutesInCont , setminutesInCont] = useState(0);
    const [taskToPutTime , setTaskToPutTime] = useState(null);

    useEffect(() => {
        if(!isPuttingTime){
            setHoursInCont(0);
            setminutesInCont(0);
            setTaskToPutTime(null);
        }

    }, [isPuttingTime])
    

    return(
    <PutTimeContext.Provider value={{isPuttingTime , setisPuttingTime , hoursInCont , setHoursInCont , minutesInCont , setminutesInCont , taskToPutTime , setTaskToPutTime}}>
        {children}
    </PutTimeContext.Provider>
    );
}