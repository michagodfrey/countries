import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvidor = ({ children }) => {
    const [theme, setTheme] = useState("light-theme");

     useEffect(() => {
       document.documentElement.className = theme;
     }, [theme]);

    const toggleTheme = () => {
        if (theme === "light-theme") {
        setTheme("dark-theme");
        } else {
        setTheme("light-theme");
        }
    };

    return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
        { children }
    </AppContext.Provider> 
)}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvidor };