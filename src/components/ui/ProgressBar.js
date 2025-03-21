// components/ui/ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress, label, color }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div 
          className={`progress-bar-fill ${color}`}
          style={{ width: `${progress}%` }}
        >
          {progress > 2 && (
            <span className="progress-bar-label">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;