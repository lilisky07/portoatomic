import React from 'react';

const Text = ({ content, size, weight = 'normal', className = '' }) => {
  const styles = {
    fontSize: size,    // Mengatur ukuran teks
    fontWeight: weight, // Mengatur ketebalan teks
  };

  return (
    <p className={`text-dark ${className}`} style={styles}>
      {content}
    </p>
  );
};

export default Text;
