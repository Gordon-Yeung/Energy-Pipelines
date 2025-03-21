// components/ui/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ currentStage, onStageClick }) => {
  const stages = [
    'Introduction',
    'Data Collection',
    'Training',
    'Carbon Impact',
    'Deployment'
  ];

  const handleStageClick = (index) => {
    // Only allow clicking to previous stages
    if (index < currentStage) {
      onStageClick(index);
    }
  };

  return (
    <div className="progress-tracker">
      <div className="stages">
        {stages.map((stage, index) => (
          <div 
            key={index}
            className={`stage ${index <= currentStage ? 'active' : ''} ${index < currentStage ? 'clickable' : ''}`}
            onClick={() => handleStageClick(index)}
            role={index < currentStage ? 'button' : undefined}
            tabIndex={index < currentStage ? 0 : undefined}
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
