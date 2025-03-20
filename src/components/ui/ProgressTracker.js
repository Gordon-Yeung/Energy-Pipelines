
// components/ui/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ currentStage }) => {
  const stages = [
    { id: 1, name: "Data Collection" },
    { id: 2, name: "GPU Training" },
    { id: 3, name: "Carbon Emissions" },
    { id: 4, name: "Deployment" }
  ];
  
  return (
    <div className="progress-tracker">
      {stages.map(stage => (
        <div 
          key={stage.id}
          className={`progress-stage ${currentStage >= stage.id ? 'active' : ''}`}
        >
          <div className="stage-number">{stage.id}</div>
          <div className="stage-name">{stage.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
