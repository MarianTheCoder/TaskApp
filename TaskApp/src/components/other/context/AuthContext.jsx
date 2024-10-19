import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        if (auth) {
            console.log(auth);
            localStorage.setItem('authToken', auth);
        } else {
            console.log("data is Unseset");
            localStorage.removeItem('authToken');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
