// components/ui/DataSource.js
import React from 'react';

const DataSource = ({ source, onDragStart }) => {
  return (
    <div 
      className={`data-source ${source.color}`}
      draggable
      onDragStart={(e) => onDragStart(e, source)}
    >
      <div className="data-source-emoji">{source.emoji}</div>
      <div className="data-source-name">{source.name}</div>
      <div className="data-source-size">{source.size} GB</div>
      <div className="data-source-description">{source.description}</div>
    </div>
  );
};

// components/ui/ComputerDropZone.js
import React from 'react';

const ComputerDropZone = ({ dataAmount, onDragOver, onDragLeave, onDrop }) => {
  return (
    <div 
      className="computer-dropzone"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="computer-icon">💻</div>
      <p className="computer-text">Drop data here</p>
      {dataAmount > 0 && (
        <div className="computer-data-amount">{dataAmount} GB</div>
      )}
    </div>
  );
};

// components/ui/DataMeter.js
import React from 'react';

const DataMeter = ({ dataAmount, comparison }) => {
  return (
    <div className="data-meter">
      <div className="data-meter-header">
        <span>Data Amount</span>
        <span>{dataAmount} GB</span>
      </div>
      <div className="data-meter-bar">
        <div 
          className="data-meter-progress"
          style={{ width: `${Math.min(100, dataAmount)}%` }}
        ></div>
      </div>
      <div className="data-meter-comparison">
        {dataAmount > 0 
          ? comparison || `Equivalent to approximately ${dataAmount * 10000} books`
          : 'Drag data sources to begin'}
      </div>
    </div>
  );
};

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
          {progress > 10 && (
            <span className="progress-bar-label">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// components/ui/MessagePopup.js
import React from 'react';

const MessagePopup = ({ message, onClose }) => {
  return (
    <div className="message-popup-overlay">
      <div className="message-popup">
        <p className="message-text">{message}</p>
        <button 
          className="message-close-button"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export { DataSource, ComputerDropZone, DataMeter, ProgressBar, MessagePopup };