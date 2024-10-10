import React from 'react';
import Text from '../atoms/Text.js';
import Title from '../atoms/Title.js';
import Button from '../atoms/Button.js';
import '../Styles/HeaderCss.css';

const Branding = () => {
  return (
    <div className="branding-container">
      <Text content="Branding | 3D Making" className="text" />
      <Title text="Visual Designer" level={1} className="visual-designer-title" />
      <Text content="We create amazing solutions for your business." className="text" />
      <Button label="Contact Us" className="btn btn-dark mt-3" />
    </div>
  );
};

export default Branding;
