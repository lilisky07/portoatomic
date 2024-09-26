import React from 'react';
import Text from '../atoms/Text'; // Adjust the import path if necessary
import Description from '../atoms/Description'; // Adjust the import path if necessary
import '../Styles/FooterCss.css'; // Ensure you have appropriate CSS

const FooterCard = ({ title, description }) => {
  return (
    <div className="footer-card">
      <Text content=" Let's work together" className="footer-title" />
      <Description text= "If you’re interested in working together or just want to say hello, feel free to get in touch." className="footer-description" />
    </div>
  );
};

export default FooterCard;
