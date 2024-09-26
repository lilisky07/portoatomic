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
              title="Let's work together"
              description="If you’re interested in working together or just want to say hello, feel free to get in touch."
            />
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/facebook.png" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.dribbble.com" target="_blank" rel="noopener noreferrer">
                <img src="/dribbble.png" alt="Dribbble" className="social-icon" />
              </a>
              <a href="https://www.behance.com" target="_blank" rel="noopener noreferrer">
                <img src="/behance.png" alt="Behance" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/nstagram.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
                <img src="/discord.png" alt="Discord" className="social-icon" />
              </a>
            </div>
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
