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

export default ComputerDropZone;