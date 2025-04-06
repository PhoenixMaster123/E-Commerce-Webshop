import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header>
      <nav className='nav'>
        <ul className="nav-menu">
          <li><input type="search" placeholder="Search categories..." /></li>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><FontAwesomeIcon icon={faCartShopping} /></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li>
            <button onClick={toggleDarkMode} className="toggle-btn">
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
  