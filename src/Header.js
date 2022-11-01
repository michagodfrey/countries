import React from 'react';
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Header = () => {
  const { theme, toggleTheme } = useGlobalContext();

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