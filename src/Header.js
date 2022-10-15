import React from 'react';
import { FaRegMoon, FaMoon } from "react-icons/fa";

const Header = () => {
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