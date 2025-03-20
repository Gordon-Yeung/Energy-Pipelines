// components/stages/IntroStage.js
import React from 'react';

const IntroStage = ({ onStart }) => {
  return (
    <div className="intro-stage">
      <h2 className="intro-title">The Energy Pipeline</h2>
      <p className="intro-description">
        Large Language Models (LLMs) like ChatGPT, Claude, and Llama require enormous 
        computational resources to train and operate. This interactive simulation will 
        show you the significant energy, water, and carbon footprint behind these AI systems.
      </p>
      <p className="intro-description">
        You'll drag and drop training data, watch GPUs heat up and consume resources, 
        and discover how even after training, every query to an AI model continues to 
        have an environmental impact.
      </p>
      <button 
        className="intro-button"
        onClick={onStart}
      >
        Begin Exploration
      </button>
    </div>
  );
};

export default IntroStage;