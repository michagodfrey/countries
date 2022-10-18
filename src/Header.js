import React, { useState, useEffect } from 'react';
import { FaRegMoon, FaSun } from "react-icons/fa";

const Header = () => {
  // toggle light and dark mode
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
    <header>
      <div className="header-content">
        <h1>Where in the World?</h1>
        {theme === "light-theme" ? (
          <button className="dark-mode-btn" onClick={toggleTheme}>
            <FaRegMoon /> Dark Mode
          </button>
        ) : (
          <button className="dark-mode-btn" onClick={toggleTheme}>
            <FaSun /> Light Mode
          </button>
        )}
      </div>
    </header>
  );
}

export default Header