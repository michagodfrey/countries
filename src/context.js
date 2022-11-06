import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

// this is for dark mode switch
const AppProvidor = ({ children }) => {
  const [theme, setTheme] = useState("light-theme");

  // maintain theme on refresh
  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark-theme") {
      setTheme("dark-theme");
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    window.localStorage.setItem("theme", theme);
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
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvidor };
