import React, { useState, useEffect } from 'react';
import { FaRegMoon, FaMoon } from "react-icons/fa";

const Header = () => {
    // const [theme, setTheme] = useState("light-theme");

    // const toggleTheme = () => {
    //   if (theme === "light-theme") {
    //     setTheme("dark-theme");
    //   } else {
    //     setTheme("light-theme");
    //   }
    // };

    // useEffect(() => {
    //   document.documentElement.className = theme;
    //   console.log(theme);
    //   console.log(document.documentElement);
    // }, [theme]);

  return (
    <header>
      <div className="header-content">
        <h1>Where in the World?</h1>
        <button className='dark-mode-btn'>
          <FaRegMoon /> Dark Mode
        </button>
      </div>
    </header>
  );
}

export default Header