import React from 'react';
import Skills from '../molecules/Skills'; // Import the Skills molecule
import '../Styles/Skills.css';

const SkillsSection = () => {
  return (
    <section className="skills-section">
      <div className="skills-header">
      <h2 className="skills-title">Skills</h2>
      </div>
      <Skills />  {/* Skills molecule included as part of the organism */}
    </section>
  );
};

export default SkillsSection;
