import React, { createContext, useState ,useEffect} from 'react'

export const NameContext = createContext();


export const NameProvider = ({ children }) => {
    const [nameUser,setNameUser] = useState(localStorage.getItem("name"));

    useEffect(() => {
        if (nameUser) {
            console.log(nameUser);
            localStorage.setItem('name', nameUser);
        } else {
            console.log("data is Unseset for name");
            localStorage.removeItem('name');
        }
    }, [nameUser]);
    
  return (
    <NameContext.Provider value = {{nameUser , setNameUser}}>
      {children}
    </NameContext.Provider>
  );
};
