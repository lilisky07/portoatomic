import React from 'react';
import Title from '../atoms/Title.js';
import Description from '../atoms/Description.js';
import '../Styles/Skills.css';

const Skill = ({ image, alt, title, description }) => {  // lowercase 'description'
  return (
    <div className="skill">
      <img src={image} alt={alt} className="skill-icon" />
      <h3 className="skill-title">{title}</h3>
      <p className="skill-description">{description}</p>  {/* Render description prop */}
    </div>
  );
};

const Skills = () => {
  const skillsData = [
    {
      image: 'Version=1.png',
      title: 'Product Design',
      description: 'Crafting digital products that solve real-world problems with innovative design solutions.',  // lowercase 'description'
    },
    {
      image: 'Version=2.png',
      title: 'Visual Design',
      description: 'Creating engaging visuals to communicate ideas and enhance user experiences.',  // lowercase 'description'
    },
    {
      image: 'Version=3.png',
      title: 'Art Direction',
      description: 'Leading the creative vision to align with the brand\'s aesthetic and storytelling goals.',  // lowercase 'description'
    },
  ];

  return (
    <div className="skills-container">
      {skillsData.map((skill, index) => (
        <Skill 
          key={index} 
          image={skill.image} 
          title={skill.title} 
          description={skill.description}  // Pass lowercase 'description'
        />
      ))}
    </div>
  );
};

export default Skills;
