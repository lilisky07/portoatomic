import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Branding from '../molecules/Header';
import '../Styles/HeaderImage.css';

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
            <div className="col-md-6" style={{ paddingLeft: '140px' }}>
              <img
              src= './HeaderImage.png' // Ganti dengan path gambar yang benar
                alt="Header"
                className="img-fluid header-image"
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
