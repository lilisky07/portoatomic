import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Error 404</h1>
        <p>Page NOT FOUND</p>
        <Link to="/" className="home-button">Back to Home</Link>
      </div>
      <div className="not-found-image">
        <img src="./Group.png" alt="Person with megaphone" />
      </div>
    </div>
  );
}

export default NotFoundPage;
