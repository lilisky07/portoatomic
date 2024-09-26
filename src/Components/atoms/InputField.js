import React from 'react';

const InputField = ({ type = 'text', placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`form-control ${className}`} // Include Bootstrap form-control class
      required
    />
  );
};

export default InputField;
