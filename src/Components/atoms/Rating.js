import React from 'react';

const Rating = ({ rating }) => {
  return <div className="testimonial-rating">{'★'.repeat(rating)}</div>;
};

export default Rating;
