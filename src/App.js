// App.js
import React from 'react';
import Home from './Components/pages/Home';
import LoginPage from './Components/pages/LoginPage'; // Importing the LoginPage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page route */}
          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
