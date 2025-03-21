// components/ui/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ currentStage, onStageClick, trainingProgress }) => {
  const stages = [
    'Introduction',
    'Data Collection',
    'Training',
    'Carbon Impact',
    'Deployment'
  ];

  const handleStageClick = (index) => {
    // Allow clicking to previous stages
    if (index < currentStage) {
      onStageClick(index);
    }
    // Allow clicking to emissions stage if training is complete
    else if (index === 3 && trainingProgress >= 100) {
      onStageClick(index);
    }
  };

  return (
    <div className="progress-tracker">
      <div className="stages">
        {stages.map((stage, index) => (
          <div 
            key={index}
            className={`stage ${index === currentStage ? 'active' : ''} ${(index < currentStage || (index === 3 && trainingProgress >= 100)) ? 'clickable' : ''} ${index > currentStage && !(index === 3 && trainingProgress >= 100) ? 'dimmed' : ''}`}
            onClick={() => handleStageClick(index)}
            role={(index < currentStage || (index === 3 && trainingProgress >= 100)) ? 'button' : undefined}
            tabIndex={(index < currentStage || (index === 3 && trainingProgress >= 100)) ? 0 : undefined}
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
