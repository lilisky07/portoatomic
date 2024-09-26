import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Branding from '../molecules/Header';

const Header = () => {
  return (
    <>
      <header className="bg-white py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section: Branding */}
            <div className="col-md-6">
              <Branding />
            </div>

            {/* Right Section: Image */}
            <div className="col-md-6" style={{ paddingLeft: '150px', marginTop: '60px' }}>
              <img
              src= './HeaderImage.png' // Ganti dengan path gambar yang benar
                alt="Header"
                className="img-fluid"
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Logo Bar Section */}
      <div className="logo-bar mt-5" style={{ width: '1280px', height: '121px', margin: '0 auto' }}>
        <img 
          src='./LogoBar.png' // Ganti dengan path gambar yang benar
          alt="LogoBar"
          style={{ width: '100%', height: '100%', marginBottom: '30px' }} // Memastikan gambar memenuhi ukuran yang ditentukan
        />
      </div>
    </>
  );
};

export default Header;
