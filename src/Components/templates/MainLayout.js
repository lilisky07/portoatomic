import React from 'react';
import Navbar from '../organisms/Navbar';
import Header from '../organisms/Header';
import Skills from '../organisms/Skills';
import Gallery from '../organisms/Gallery';
import Testimonial from '../organisms/Testimonial';
import Footer from '../organisms/Footer';
import Getin from '../organisms/Getin';

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar di bagian atas */}
      <Navbar />
      {/* Konten halaman */}
      <main>
     <Header/>
     <Skills/>
     <Gallery/>
     <Testimonial/>
     <Getin/>
      </main>

      {/* Footer di bagian bawah (opsional) */}
      <Footer/>
    </div>
  );
};

export default MainLayout;
