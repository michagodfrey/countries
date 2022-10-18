import React from 'react';
import { useGlobalContext } from './context';
import { FaRegMoon, FaSun } from "react-icons/fa";

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