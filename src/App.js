// App.js
import React from 'react';
import Navbar from './Components/organisms/Navbar';
import Home from './Components/pages/Home';
import LoginPage from './Components/pages/LoginPage'; // Importing the LoginPage
import Sektoral from './Components/pages/Sektoral'; // Importing the LoginPage
import BukuDigital from './Components/pages/BukuDigital'; // Importing the LoginPage
import NotFoundPage from './Components/pages/NotFoundPage'; // Import 404 page
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page route */}
          <Route path="/sektoral" element={<Sektoral />} /> {/* Login page route */}
          <Route path="/bukudigital" element={<BukuDigital />} /> {/* Login page route */}
          {/* Add other routes here */}
           {/* Route wildcard for 404 page */}
        <Route path="*" element={<NotFoundPage />} />    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
