import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/pages/LoginPage'; // Adjust the import as necessary

function App() {
  return (
    <div className="App">
      {/* Render HomePage */}
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
