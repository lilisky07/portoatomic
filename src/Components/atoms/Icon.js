import React from 'react';


const Icon = ({ link, imgSrc, altText }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} alt={altText} className="icon" />
    </a>
  );
};

export default SocialIcon;
