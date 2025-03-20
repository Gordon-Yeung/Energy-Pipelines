// components/ui/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ currentStage }) => {
  const stages = [
    'Introduction',
    'Data Collection',
    'Training',
    'Carbon Impact',
    'Deployment'
  ];

  return (
    <div className="progress-tracker">
      <div className="stages">
        {stages.map((stage, index) => (
          <div 
            key={index}
            className={`stage ${index <= currentStage ? 'active' : ''}`}
          >
            <div className="stage-number">{index + 1}</div>
            <div className="stage-name">{stage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
