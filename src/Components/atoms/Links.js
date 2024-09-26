import React from 'react';

const Link = ({ label, href, className = '' }) => {
  return (
    <a href={href} className={`link ${className}`}>
      {label}
    </a>
  );
};

export default Link;
