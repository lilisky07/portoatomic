import React from 'react';
import Links from '../atoms/Links';
import Button from '../atoms/Button'; // Import the button component for logout
import '../Styles/NavbarCss.css';

const handleLogout = () => {
  // Clear token and redirect to login page
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const NavLinks = () => {
  return (
    <div className="d-flex justify-content-end align-items-center w-100 custom-nav-container">
      {/* Navigation Links */}
      <ul className="navbar-nav d-flex flex-row align-items-center me-3 custom-nav">
        <Links className="nav-link" href="#about" label="About" />
        <Links className="nav-link" href="#work" label="Work" />
        <Links className="nav-link" href="#contact" label="Contact" />
      </ul>
      {/* Logout Button */}
      <Button
        className="btn btn-outline-danger"
        onClick={handleLogout}
        label="Logout"
      />
    </div>
  );
};

export default NavLinks;
