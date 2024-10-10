import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
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
          <NavLink
            exact
            to="/"
            className="nav-link"
            activeClassName="active-link"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/sektoral"
            className="nav-link"
            activeClassName="active-link"
          >
            Sektoral
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/bukudigital"
            className="nav-link"
            activeClassName="active-link"
          >
            Buku Digital
          </NavLink>
        </li>
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
