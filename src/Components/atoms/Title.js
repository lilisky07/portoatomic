import React from 'react';

const Title = ({ text, level = 1, className = '' }) => {
  const Tag = `h${level}`; // Dinamis memilih elemen heading berdasarkan level

  return <Tag className={className}>{text}</Tag>;
};

export default Title;
