import React from 'react';
import Links from '../atoms/Links';
import '../Styles/NavbarCss.css';

const NavLinks = () => {
  return (
    <ul className="navbar-nav ms-auto custom-nav">
      <Links className="nav-link" href="#about" label="About" />
      <Links className="nav-link" href="#work" label="Work" />
      <Links className="nav-link"href="#contact" label="Contact" />
    </ul>
  );
};

export default NavLinks;
