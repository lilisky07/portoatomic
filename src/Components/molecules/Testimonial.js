import React from 'react';
import Title from '../atoms/Title'; // Import your Title atom
import Description from '../atoms/Description'; // Import your Description atom
import '../Styles/TestimonialCss.css'; // Ensure appropriate CSS is imported

const TestimonialCard = ({ text, name, rating, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-text">
        <Description text={text} className="testimonial-description" />
      </div>
      <div className="testimonial-info">
        <img src={image} alt={`${name}'s photo`} className="testimonial-photo" />
        <div className="testimonial-details">
          <div className="testimonial-rating">
            {'★'.repeat(rating)} {/* Displays stars based on rating */}
          </div>
          <Title text={name} level={4} className="testimonial-name" /> {/* Use Title atom for name */}
          <p className="testimonial-source">Google</p> {/* Source can be adjusted or removed */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
