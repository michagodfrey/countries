import React from 'react';
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useGlobalContext();

  return (
    <header>
      <div className="header-content">
        <Link to={"/"}>
          <h1>Where in the World?</h1>
        </Link>
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