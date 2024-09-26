import React from 'react';
import Logo from '../atoms/Logo';
import NavLinks from '../molecules/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Navbarc.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Logo />
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
