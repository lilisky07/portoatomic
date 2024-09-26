import React from 'react';
import Text from '../atoms/Text.js';
import Title from '../atoms/Title.js';
import Button from '../atoms/Button.js';
import '../Styles/HeaderCss.css';

const Branding = () => {
  return (
    <div style={{ paddingLeft: '80px', marginTop: '50px' , textAlign: 'left'}}>
      <Text content="Branding | 3D Making" size="18px" />
      <Title text="Visual Designer" level={1} className="visual-designer-title" />
      <Text content="We create amazing solutions for your business." size="16px" />
      <Button label="Contact Us" />
    </div>
  );
};

export default Branding;
