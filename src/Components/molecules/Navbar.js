import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
        <li className="nav-item">
          <Link className="nav-link" to="/sektoral">Sektoral</Link> {/* Updated link */}
        </li>
        <Link className="nav-link" to="/bukudigital">Buku Digital</Link> {/* Updated link */}    
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
