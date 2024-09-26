import React from 'react';
import Image from '../atoms/Image'; // Import the Image component
import Text from '../atoms/Text'; // Import the Text component for testimonial text
import Title from '../atoms/Title'; // Import the Title component for the name
import Rating from '../atoms/Rating'; // Import the Rating component for displaying the rating
import '../Styles/TestimonialCss.css'; // Import the CSS file

const TestimonialCard = ({ text, name, rating, image }) => {
  return (
    <div className="testimonial-card">
      <Text content={text} className="testimonial-text" />
      <div className="testimonial-info">
        <Image src={image} alt={`${name}'s photo`} className="testimonial-photo" />
        <div className="testimonial-details">
          <Rating value={rating} /> {/* Use the Rating component */}
          <Title text={name} level={4} className="testimonial-name" />
          <Text content="Google" className="testimonial-google" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
