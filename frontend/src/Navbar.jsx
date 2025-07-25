import React from 'react';
import './Navbar.css';

const Navbar = ({ onSignupClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <div className="navbar-links">
        <button className="signup-button" onClick={onSignupClick}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
