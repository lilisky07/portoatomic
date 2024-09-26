import React from 'react';
import '../Styles/FooterCss.css'; // Ensure you have appropriate CSS
import FooterCard from '../molecules/Footer'; // Ensure the correct import path for FooterCard
import Button from '../atoms/Button';
import InputField from '../atoms/InputField'; // Import InputField atom

const Footer = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row">
          {/* Left Side - FooterCard */}
          <div className="col-lg-6 col-md-12 footer-left">
            <FooterCard 
            />
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 col-md-12 footer-right">
            <form className="footer-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <InputField type="text" placeholder="Your Name" className="mb-3" />
              </div>
              <div className="form-group">
                <InputField type="email" placeholder="Your Email Address" className="mb-3" />
              </div>
              <Button label="Submit" className="btn btn-dark mt-3" />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
