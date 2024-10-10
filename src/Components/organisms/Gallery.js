import React from 'react';
import '../Styles/LatestCSS.css'; // Import CSS for additional styling

const LatestWork = () => {
  const works = [
    {
      id: 1,
      title: 'UI Design',
      description: 'Creating responsive user interfaces.',
      imageUrl: '/image.png', // Image from public folder
    },
    {
      id: 2,
      title: 'Art Direction',
      description: 'Leading creative design projects.',
      imageUrl: '/image2.png',
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Building interactive websites.',
      imageUrl: '/image3.png',
    },
    {
      id: 4,
      title: 'Branding',
      description: 'Developing brand identity designs.',
      imageUrl: '/image4.png',
    },
    {
      id: 5,
      title: '3D Rendering',
      description: 'Visualizing concepts in 3D.',
      imageUrl: '/image5.png',
    },
    {
      id: 6,
      title: 'Product Design',
      description: 'Creating functional product designs.',
      imageUrl: '/image6.png',
    },
  ];

  return (
    <div>
      <div className="latest-work-container">
      <h2 className="latest-work-title">Latest Work</h2> {/* Title added here */}
        {works.map((work) => (
          <div key={work.id} className="work-item">
            <img src={work.imageUrl} alt={work.title} className="work-image" />
            <h3 className="work-title">{work.title}</h3>
            <p className="work-description">{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestWork;
