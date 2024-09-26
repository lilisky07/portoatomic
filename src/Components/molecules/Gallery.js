import React from 'react';
import Image from '../atoms/Image'; // Import the Image component
import Title from '../atoms/Title'; // Import the Title component
import Description from '../atoms/Description'; // Import the Description component
import '../Styles/LatestCSS.css'; // Import CSS for work item styling

const WorkItem = ({ imageUrl, title, description }) => {
  return (
    <div className="work-item">
      <Image src={imageUrl} alt={title} className="work-image" /> {/* Correctly using Image component */}
      <Title text={title} level={3} className="work-title" /> {/* Correctly using Title component */}
      <Description text={description} className="work-description" /> {/* Use Description component */}
    </div>
  );
};

export default WorkItem;
