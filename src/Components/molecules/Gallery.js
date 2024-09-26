import React from 'react';
import image from '../atoms/Image';
import Title from '../atoms/Title';
import Description from '../atoms/Description';
import '../Styles/LatestCSS.css'; // Import CSS for work item styling

const WorkItem = ({ image, title, description }) => {
  return (
    <div className="work-item">
      <img src={image} alt={title} className="work-image" />
      <Title text={title} level={3} className="work-title" />
      <p className="work-description">{description}</p>
    </div>
  );
};

export default WorkItem;
