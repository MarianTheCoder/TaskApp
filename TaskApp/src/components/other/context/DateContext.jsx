import React, { createContext , useState } from 'react'

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date , newDate] = useState(null);

  return (
    <DateContext.Provider value = {{date , newDate}}>
      {children}
    </DateContext.Provider>
  );
};
