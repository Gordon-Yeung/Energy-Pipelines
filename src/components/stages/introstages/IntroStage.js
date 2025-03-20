// components/stages/IntroStage.js
import React from 'react';

const IntroStage = ({ onStart }) => {
  return (
    <div className="intro-stage">
      <div className="intro-content">
        <h2>Welcome to the Energy Pipeline</h2>
        <p>
          Discover the environmental impact of training and running large language models.
          Follow the journey from data collection to deployment, and see the energy costs
          at each stage.
        </p>
        <button 
          className="start-button"
          onClick={onStart}
        >
          Start Journey
        </button>
      </div>
    </div>
  );
};

export default IntroStage;