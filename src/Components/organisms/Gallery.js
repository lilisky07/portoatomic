import React from 'react';
import WorkItem from '../molecules/Gallery'; // Import the molecule
import image from '../atoms/Image';
import '../Styles/LatestCSS.css'; // Import organism-level CSS

const Gallery = () => {
  const works = [
    {
      id: 1,
      title: 'UI Design',
      description: 'Creating responsive user interfaces.',
      image: './Image.png',
    },
    {
      id: 2,
      title: 'Art Direction',
      description: 'Leading creative design projects.',
      image: '/image2.png',
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Building interactive websites.',
      ImageUrl: '/image3.png',
    },
    {
      id: 4,
      title: 'Branding', 
      description: 'Developing brand identity designs.',
      Image: '/image4.png',
    },
    {
      id: 5,
      title: '3D Rendering',
      description: 'Visualizing concepts in 3D.',
      image: '/image5.png',
    },
    {
      id: 6,
      title: 'Product Design',
      description: 'Creating functional product designs.',
      image: '/image6.png',
    },
  ];

  return (
    <section className="latest-work-section">
      <h2 className="latest-work-title">Latest Work</h2>
      <div className="latest-work-container">
        {works.map((work) => (
          <WorkItem
            key={work.id}
            imageUrl={work.imageUrl}
            title={work.title}
            description={work.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
