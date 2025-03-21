import React from 'react';

const TrainingCompletePopup = ({ onProceed, onClose }) => {
  return (
    <div className="training-complete-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>✕</button>
        
        <h2>🎉 Training Complete!</h2>
        
        <p className="completion-message">
          Your AI model has finished training. Ready to explore its environmental impact?
        </p>

        <div className="popup-actions">
          <button 
            className="proceed-button"
            onClick={onProceed}
          >
            Proceed to Environmental Impact Analysis →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingCompletePopup; 